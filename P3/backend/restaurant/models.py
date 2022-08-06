from django.core.validators import RegexValidator
from django.db import models
from django.db import models
from accounts.models import User
from django.db import models
from django.db.models import SET_NULL, CASCADE


class Restaurant(models.Model):
    name = models.CharField(max_length=500)
    owner = models.OneToOneField(to=User, related_name='restaurant',
                                 on_delete=CASCADE)
    description = models.CharField(max_length=500, null=True, blank=True)
    address = models.CharField(max_length=500, null=True, blank=True)
    postal_code = models.CharField(max_length=500, null=True, blank=True)
    followers = models.ManyToManyField(to=User,
                                       related_name='followings',
                                       null=True, blank=True)
    likes = models.ManyToManyField(to=User,
                                   related_name='likes',
                                   null=True, blank=True)
    logo = models.ImageField(upload_to='restaurant_logo/', null=True, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17,
                                    null=True, blank=True)

    def __str__(self):
        return self.name


class Restaurant_Comment(models.Model):
    poster = models.ForeignKey(to=User, related_name='restaurant_comments',
                               on_delete=CASCADE)
    restaurant = models.ForeignKey(to=Restaurant, related_name='comments',
                                   on_delete=CASCADE)
    content = models.CharField(max_length=500)
    time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.poster.username}, {self.restaurant.name} : {self.content}'


class Food(models.Model):
    name = models.CharField(max_length=500)
    restaurant = models.ForeignKey(to=Restaurant, related_name='foods',
                                   on_delete=CASCADE)
    description = models.CharField(max_length=500, null=True, blank=True)
    price = models.PositiveIntegerField()
    images = models.ImageField(null=True, blank=True, upload_to='food_photo')

    def __str__(self):
        return f'{self.name} from {self.restaurant}'

# Create your models here.
