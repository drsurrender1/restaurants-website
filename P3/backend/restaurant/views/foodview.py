import datetime

from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, ListAPIView, \
    get_object_or_404, \
    RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant.models import Food, Restaurant
from restaurant.serializers import FoodSerializer

from notification.models import Notification


class IsOwner(BasePermission):
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


class CreateFoodView(CreateAPIView):
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = FoodSerializer

    def get(self, request, *args, **kwargs):
        return Response({})

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        print("here")
        # https://andela.com/insights/how-to-use-django-rest-framework-
        # apiview-to-create-a-django-api-part-2/
        print(self.kwargs)
        print(self.request.data)
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['rest_id'])
        print("rest found")
        # poster = get_object_or_404(User, id=self.request.user.id)
        # print("poster found")
        serializer.save(restaurant=restaurant)
        for i in restaurant.followers.all():
            noti = Notification(
                receiver=i,
                initiator=restaurant.owner,
                message=restaurant.name +" have new food!",
                url = reverse('restaurant:view_menu',
                        kwargs={'rest_id': restaurant.id}),
                time=datetime.datetime.now(),
                is_viewed=False
            )
            noti.save()


class MenuView(ListAPIView):
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        rest = Restaurant.objects.get(id=self.kwargs['rest_id'])
        return Food.objects.filter(restaurant=rest)


class UpdateFoodView(RetrieveAPIView, UpdateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated,]
    lookup_url_kwarg = 'food_id'

    def get_queryset(self):
        return Food.objects.filter(id=self.kwargs['food_id'])

    def update(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.get(id=self.kwargs['rest_id'])
        for i in restaurant.followers.all():
            noti = Notification(
                receiver=i,
                initiator=restaurant.owner,
                message=restaurant.name + " update food!",
                url=reverse('restaurant:view_menu',
                            kwargs={'rest_id': restaurant.id}),
                time=datetime.datetime.now(),
                is_viewed=False
            )
            noti.save()
        return super().update(request, *args, **kwargs)


class DeleteFoodView(DestroyAPIView):
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        food = get_object_or_404(Food, id=self.kwargs['food_id'])
        return food

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=200)
