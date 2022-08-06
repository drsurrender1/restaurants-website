from django.db import models
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.db.models import SET_NULL, CASCADE

# https://learndjango.com/tutorials/django-custom-user-model


class User(AbstractUser):
    avatar = models.ImageField(upload_to='user_profile', null=True, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17,
                                    null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    first_name = models.CharField(max_length=150, null=True, blank=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.username
# Create your models here.
