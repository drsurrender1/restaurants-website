from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, get_object_or_404, \
    RetrieveAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import restaurant
from accounts.models import User
from restaurant.models import Restaurant_Comment
import json
# Create your views here.
from restaurant.models import Restaurant
from restaurant.serializers import *
from notification.serializers import NotSerializer

from notification.models import Notification


class IsOwner(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        # print('here')
        # print(view.kwargs)
        rest_comm = get_object_or_404(Restaurant_Comment,
                                      id=view.kwargs.get('rest_comm_id'))
        return rest_comm.poster.id == request.user.id


class CreateRestaurantCommentView(CreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = RestaurantCommentSerializer

    def post(self, request, *args, **kwargs):
        # print(self.request.data)
        # print(self.request.user.id)
        # print(f"args={args}")
        # print(f"kwargs={kwargs}")
        # rest_id = kwargs.get('rest_id')
        # rest = get_object_or_404(Restaurant, id=rest_id)
        # user = get_object_or_404(User, id=self.request.user.id)
        # self.serializer_class.save(self.serializer_class,
        # poster=user, restaurant=rest)
        return super().post(request, *args, **kwargs)

    # def get_object(self):
    #     return get_object_or_404(Restaurant, id=self.kwargs['rest_id'])

    def perform_create(self, serializer):
        print("here")
        # https://andela.com/insights/how-to-use-django-rest-framework-
        # apiview-to-create-a-django-api-part-2/
        print(self.kwargs)
        print(self.request.data)
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['rest_id'])
        # print("rest found")
        poster = get_object_or_404(User, id=self.request.user.id)
        # print("poster found")
        serializer.save(poster=poster, restaurant=restaurant)
        # print("here")
        # data={
        #     "receiver": restaurant.owner,
        #     "initiator": self.request.user,
        #     "message": "You have a new Restaurant Comment!",
        #     "time": datetime.datetime.now(),
        #     "is_viewed": False
        # }
        # NotSerializer.create(validated_data=data)
        noti = Notification(
            receiver=restaurant.owner,
            initiator=self.request.user,
            message="You have a new Restaurant Comment!",
            url = str(["rest_id", restaurant.id]),
            time=datetime.datetime.now(),
            is_viewed=False
        )
        noti.save()


class RestaurantCommentView(ListAPIView):
    serializer_class = RestaurantCommentSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'rest_comm_id'

    def get_queryset(self):
        rest = Restaurant.objects.get(id=self.kwargs['rest_id'])
        return Restaurant_Comment.objects.filter(restaurant=rest)


class UpdateRestaurantCommentView(RetrieveAPIView, UpdateAPIView):
    serializer_class = RestaurantCommentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    # def patch(self, request, *args, **kwargs):
    #     print("hi")
    #     print(self.kwargs)
    #     return self.patch(request, *args, **kwargs)

    def get_object(self):
        # print('hi')
        # print(self.kwargs)
        return get_object_or_404(Restaurant_Comment, id=self.kwargs['rest_comm_id'])


class DeleteRestCommentView(DestroyAPIView):
    serializer_class = RestaurantCommentSerializer
    permission_classes = [IsAuthenticated]

    # TODO How to check if its the owner of user?
    def get_object(self):
        user = self.request.user
        restcomment = get_object_or_404(Restaurant_Comment, id=self.kwargs['rest_comm_id'])
        owner = restcomment.restaurant.owner
        if user == restcomment.poster or user ==owner:
            return restcomment
        else:
            return HttpResponse(status=401)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # print(instance)
        user = self.request.user
        owner = instance.restaurant.owner
        if not instance:
            return HttpResponse(status=404)
        if user == instance.poster or user == owner:
            self.perform_destroy(instance)
            return Response(status=200)
