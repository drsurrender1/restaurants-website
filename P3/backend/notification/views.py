# Create your views here.
import datetime

from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, ListAPIView, \
    get_object_or_404, \
    RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import User
from django.contrib.auth import authenticate, login, logout, get_user
# Create your views here.
from blog.models import Blog, Blog_Comment
from blog.serializers import *
from notification.models import Notification
from notification.serializers import NotSerializer
from restaurant.models import Restaurant

from blog.serializers import BlogSerializer


class AllNotiView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotSerializer

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user)


class NotiView(ListAPIView):
    serializer_class = NotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        notification_qs = Notification.objects.filter(receiver=self.request.user,
                                                      is_viewed=False)
        for noti in notification_qs:
            noti.is_viewed = True
            noti.save()
        return notification_qs
