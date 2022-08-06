import datetime
from rest_framework import serializers
from notification.models import Notification


class NotSerializer(serializers.ModelSerializer):
    initiator = serializers.CharField(read_only=True)
    time = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id','receiver', 'url', 'message', 'time', 'is_viewed',
                  'initiator']

    # def validate(self, attrs):

    def create(self, validated_data):
        receiver = validated_data.get('reciever')
        initiator = validated_data.get('initiator')
        url = validated_data.get('url')
        message = validated_data.get('message')
        time = validated_data.get('time')
        is_viewed = validated_data.get('is_viewed')

        notification = Notification(
            receiver=receiver,
            initiator=initiator,
            url=url,
            message=message,
            time=time,
            is_viewed=is_viewed
        )
        notification.save()
        return notification


