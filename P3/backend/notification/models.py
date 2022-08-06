from django.core.validators import RegexValidator
from django.db import models
from django.db import models
from accounts.models import User
from django.db import models
from django.db.models import SET_NULL, CASCADE
from restaurant.models import Restaurant


# Create your models here.
# reciever url message is_viewed
class Notification(models.Model):
    receiver = models.ForeignKey(to=User, related_name='user_notification',
                                 on_delete=CASCADE)
    initiator = models.ForeignKey(to=User, related_name='initiator',
                                  on_delete=CASCADE)
    url = models.CharField(max_length=500, blank=True, null=True)
    message = models.CharField(max_length=500)
    time = models.DateTimeField(blank=True, null=True)
    is_viewed = models.BooleanField(default=False)

    def __str__(self):
        return f'[{self.initiator}] :{self.message}'

