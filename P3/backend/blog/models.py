from django.core.validators import RegexValidator
from django.db import models
from django.db import models
from accounts.models import User
from django.db import models
from django.db.models import SET_NULL, CASCADE
# Create your models here.
from restaurant.models import Restaurant


class Blog(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, related_name='blogs',
                                   on_delete=CASCADE)
    title = models.CharField(max_length=500)
    content = models.CharField(max_length=500)
    images = models.ImageField(null=True, blank=True, upload_to='blog_photo')
    time = models.DateTimeField(null=True, blank=True)
    likes = models.ManyToManyField(to=User, related_name='blog_like',
                                   null=True, blank=True)

    def __str__(self):
        return f'Rest:[{self.restaurant}] posted {self.title}'


class Blog_Comment(models.Model):
    poster = models.ForeignKey(to=User, related_name='blog_comments',
                               on_delete=CASCADE)
    blog = models.ForeignKey(to=Blog, related_name='comments',
                             on_delete=CASCADE)
    time = models.DateTimeField(null=True, blank=True)
    content = models.CharField(max_length=500)

    def __str__(self):
        return f'User:[{self.poster}] comments "{self.content}"'

