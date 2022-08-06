from rest_framework import serializers

from accounts.models import User
from rest_framework import status
from urllib.parse import urlencode


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User

        fields = ['id', 'email', 'avatar', 'phone_number', 'password', 'password2',
                  'first_name', 'last_name', 'username', 'phone_number']


    def validate(self, attrs):
        print("=========validate here===========")
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password2 is None and password:
            raise serializers.ValidationError(
                {
                    'password2': "Password 2 not provided"})

        if password and len(password) < 8:
            raise serializers.ValidationError(
                {
                    'password': "This password is too short. It must contain at least 8 characters"})
        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        # print(validated_data)
        username = validated_data.get('username')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')
        phone_number = validated_data.get('phone_number')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        avatar = validated_data.get('avatar')
        email = validated_data.get('email')
        if not password or not password2:
            raise serializers.ValidationError({
              'password': "Please provide Password and re-enter Password"
            })
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError(
                {'username': "A user with that username already exists"})
        # return super().create(validated_data)
        user = User(
            username=username,
            email=email,
            avatar=avatar,
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    # def update(self, instance, validated_data):
    #     """
    #     Update and return an existing `Snippet` instance, given the validated data.
    #     """
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.photo = validated_data.get('photo', instance.photo)
    #     instance.password = validated_data.get('password', instance.password)
    #     instance.first_name = validated_data.get('first_name',
    #                                              instance.first_name)
    #     instance.phone_number = validated_data.get('phone_number',
    #                                                instance.phone_number)
    #     instance.last_name = validated_data.get('last_name', instance.last_name)
    #     instance.save()
    #     return instance
