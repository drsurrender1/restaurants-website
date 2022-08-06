# Create your views here.
import datetime
import json
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, ListAPIView, \
    get_object_or_404, \
    RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import User
from django.contrib.auth import authenticate, login, logout, get_user
# Create your views here.
from blog.models import Blog, Blog_Comment
from blog.serializers import *
from restaurant.models import Restaurant

from blog.serializers import BlogSerializer

from notification.models import Notification


class IsBlogOwner(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        # print('here')
        # print(view.kwargs)
        blog = get_object_or_404(Blog, id=view.kwargs.get('blog_id'))
        rest = get_object_or_404(Restaurant, id=request.user.restaurant.id)
        return blog.restaurant.id == rest.id


class IsCommentOwner(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):

        blog_comm = get_object_or_404(Blog_Comment,
                                      id=view.kwargs.get('blog_comment_id'))
        return blog_comm.poster.id == request.user.id


class FeedView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def get_queryset(self):
        rest = Restaurant.objects.filter(id__in=self.request.user.followings.all())
        print(rest)
        print(Blog.objects.filter(restaurant__in=rest))
        return Blog.objects.filter(restaurant__in=rest)


class CreateBlogView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        if not self.request.user.restaurant:
            print(self.request.user.name)
            HttpResponse(status=404)
        else:
            time = datetime.datetime.now()
            serializer.save(restaurant=self.request.user.restaurant, time=time)
            
            for i in self.request.user.restaurant.followers.all():
                url = {'rest_id': self.request.user.restaurant.id}
                noti = Notification(
                    receiver=i,
                    initiator=self.request.user.restaurant.owner,
                    url=str(url),
                    message=self.request.user.restaurant.name + " create blog!",
                    time=datetime.datetime.now(),
                    is_viewed=False
                )
                noti.save()


class BlogView(RetrieveAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['blog_id'])


class UpdateBlogView(RetrieveAPIView, UpdateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsBlogOwner]

    def get_object(self):
        blog = get_object_or_404(Blog, id=self.kwargs['blog_id'])
        return blog


class DeleteBlogView(DestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsBlogOwner]

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['blog_id'])


class LikeOrUnlikeBlog(APIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'blog_id'

    def post(self, request, *args, **kwargs):
        user = self.request.user
        blog_id = self.kwargs.get('blog_id')
        blog = get_object_or_404(Blog, id=self.kwargs['blog_id'])
        # print(blog.likes.all())
        if user in blog.likes.all():
            blog.likes.remove(user.id)
            blog.save()
            return Response("removed like", status=200)
        else:
            blog.likes.add(user.id)
            blog.save()
            # print(blog.likes.all().get())
            restaurant = blog.restaurant

            noti = Notification(
                receiver=restaurant.owner,
                initiator=user,
                url = str(["blog_id", blog_id]),
                message=f"{user.username} like your blog!",
                time=datetime.datetime.now(),
                is_viewed=False
            )
            noti.save()
            return Response("added like", status=200)


# blog comment
class CreateBlogCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlogCommentSerializer

    def perform_create(self, serializer):
        blog_id = self.kwargs.get('blog_id')
        time = datetime.datetime.now()
        blog = get_object_or_404(Blog, id=self.kwargs['blog_id'])
        user = self.request.user
        serializer.save(blog=blog, time=time, poster=user)
        
        noti = Notification(
            receiver=blog.restaurant.owner,
            initiator=user,
            url = str(["blog_id", blog_id]),
            message=f"{user.username} comment your blog !",
            time=datetime.datetime.now(),
            is_viewed=False
        )
        noti.save()


class AllBlogCommentView(ListAPIView):
    serializer_class = BlogCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        blog = Blog.objects.get(id=self.kwargs['blog_id'])
        return Blog_Comment.objects.filter(blog=blog)


class BlogCommentView(RetrieveAPIView):
    serializer_class = BlogCommentSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'blog_comm_id'


class UpdateBlogCommentView(RetrieveAPIView, UpdateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsCommentOwner]


class DeleteBlogCommentView(DestroyAPIView):
    serializer_class = BlogCommentSerializer
    permission_classes = [IsAuthenticated, IsCommentOwner]

    def get_object(self):
       return get_object_or_404(Blog_Comment, id=self.kwargs['blog_comm_id'])

