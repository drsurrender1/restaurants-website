import datetime

from rest_framework import serializers
from blog.models import Blog, Blog_Comment


class BlogSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(read_only=True)
    time = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Blog
        fields = ['id','restaurant', 'title', 'content', 'time', 'images', 'likes']

    # def validate(self, attrs):

    def create(self, validated_data):
        title = validated_data.get('title')
        content = validated_data.get('content')
        images = validated_data.get('images')
        time = validated_data.get('time')
        restaurant = validated_data.get('restaurant')

        blog = Blog(
            title=title,
            content=content,
            images=images,
            time=time,
            restaurant=restaurant
        )
        blog.save()
        return blog


class LikeBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['like']


class BlogCommentSerializer(serializers.ModelSerializer):
    poster = serializers.CharField(read_only=True)
    time = serializers.DateTimeField(read_only=True)
    blog = serializers.CharField(read_only=True)

    class Meta:
        model = Blog_Comment
        fields = ['id','poster', 'blog', 'time', 'content']

    def create(self, validated_data):
        poster = validated_data.get('poster')
        blog = validated_data.get('blog')
        time = validated_data.get('time')
        content = validated_data.get('content')

        blog_comment = Blog_Comment(
            poster=poster,
            blog=blog,
            content=content,
            time=time
        )
        blog_comment.save()
        return blog_comment
