import datetime
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, ListAPIView, \
    get_object_or_404, \
    RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import User
from django.db.models import Q
import json
# Create your views here.
from restaurant.models import Food, Restaurant
from restaurant.serializers import RestaurantSerializer
from blog.serializers import BlogSerializer
from blog.models import Blog

from notification.models import Notification


class IsRestOwner(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        # print('here')
        # print(view.kwargs)
        rest = get_object_or_404(Restaurant, id=view.kwargs.get('rest_id'))
        # print(rest.owner.id)
        owner_id = rest.owner.id
        return owner_id == request.user.id


class SearchRestaurantView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RestaurantSerializer
    ordering = ['likes.count()']

    def get_queryset(self):
        target_name = self.request.query_params.get('name', '')
        name_rest = Restaurant.objects.filter(Q(name__contains=target_name)).distinct()
        target_addr = self.request.query_params.get('address', '')
        addr_rest = Restaurant.objects.filter(Q(address__contains=target_addr)).distinct()
        target_food = self.request.query_params.get('food', '')
        food_result = Food.objects.filter(Q(name__contains=target_food))
        food_rest = Restaurant.objects.filter(foods__in=food_result).distinct()
        result2 = name_rest & addr_rest & food_rest
        
        return result2.distinct()


class CreateRestaurantView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RestaurantSerializer

    def perform_create(self, serializer):
        # https://andela.com/insights/how-to-use-django-rest-framework-
        # apiview-to-create-a-django-api-part-2/
        owner = get_object_or_404(User, id=self.request.data.get('owner'))
        serializer.save(owner=owner)


class RestaurantView(RetrieveAPIView):
    serializer_class = RestaurantSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Restaurant, id=self.kwargs['rest_id'])

class GetRestaurantView(RetrieveAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return get_object_or_404(Restaurant, owner=self.kwargs['id'])


class UpdateRestaurantView(RetrieveAPIView, UpdateAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated, IsRestOwner]

    def get_object(self):
        return get_object_or_404(Restaurant, id=self.kwargs['rest_id'])


class RestBlogView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.filter(restaurant=self.kwargs['rest_id'])

class FollowORUnfoRestaurantView(APIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        rest_id = self.kwargs.get('rest_id')
        restaurant = get_object_or_404(Restaurant, id=rest_id)
        if user in restaurant.followers.all():
            restaurant.followers.remove(user.id)
            restaurant.save()
            return Response("remove follow", status=200)
        else:
            restaurant.followers.add(user.id)
            restaurant.save()
            notification = Notification(
                receiver=restaurant.owner,
                initiator=user,
                url=str(["rest_id", rest_id]),
                message=f"{user.username} follows your restaurant!",
                time=datetime.datetime.now(),
                is_viewed=False
            )
            notification.save()
            return Response("add follow", status=200)


class LikeOrUnlikeRestaurant(APIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    # lookup_url_kwarg = 'id'
    def post(self, request, *args, **kwargs):
        user = self.request.user
        rest_id = self.kwargs.get('rest_id')
        restaurant = get_object_or_404(Restaurant, id=rest_id)
        # print(blog.likes.all())
        if user in restaurant.likes.all():

            restaurant.likes.remove(user.id)
            restaurant.save()
            return Response("remove like", status=200)
        else:
            restaurant.likes.add(user.id)
            restaurant.save()
            notification = Notification(
                receiver=restaurant.owner,
                initiator=user,
                url = str(["rest_id", rest_id]),
                message=f"{user.username} likes your restaurant!",
                time=datetime.datetime.now(),
                is_viewed=False
            )
            notification.save()
            return Response("add like", status=200)
