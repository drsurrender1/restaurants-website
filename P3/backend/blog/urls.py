from django.urls import path
from blog.views import *
app_name = "blog"
urlpatterns = [
    path('feed/', FeedView.as_view(), name='feed'),
    path('add/', CreateBlogView.as_view(), name='add_blog'),
    path('<int:blog_id>/', BlogView.as_view(), name='view_blog'),
    path('<int:blog_id>/edit/', UpdateBlogView.as_view(), name='edit_blog'),
    path('<int:blog_id>/delete/', DeleteBlogView.as_view(), name='delete_blog'),
    path('<int:blog_id>/like/', LikeOrUnlikeBlog.as_view(), name='likeblog'),

    path('<int:blog_id>/comments/add/', CreateBlogCommentView.as_view(), name='add_blog_comment'),
    path('<int:blog_id>/comments/', AllBlogCommentView.as_view(), name='view_all_blog_comment'),
    path('<int:blog_id>/comments/<int:blog_comm_id>/', BlogCommentView.as_view(), name='view_blog_comment'),
    path('<int:blog_id>/comments/<int:blog_comm_id>/edit/', UpdateBlogCommentView.as_view(), name='edit_blog_comment'),
    path('comment/<int:blog_comm_id>/delete/', DeleteBlogCommentView.as_view(), name='delete_blog_comment'),

]
