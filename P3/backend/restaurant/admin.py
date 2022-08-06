from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

from restaurant.models import *

admin.site.register(Restaurant)
admin.site.register(Restaurant_Comment)
admin.site.register(Food)
# Register your models here.
