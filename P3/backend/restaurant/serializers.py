from rest_framework import serializers
import datetime
from accounts.models import User
from rest_framework.generics import DestroyAPIView
from restaurant.models import Food, Restaurant, Restaurant_Comment


class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = ['id','name', 'owner', 'description', 'address', 'postal_code',
                  'followers', 'likes', 'logo', 'phone_number']

    def create(self, validated_data):
        name = validated_data.get('name')
        phone_number = validated_data.get('phone_number')
        description = validated_data.get('description')
        address = validated_data.get('address')
        logo = validated_data.get('logo')
        owner = validated_data.get('owner')

        rest = Restaurant(
            name=name,
            owner=owner,
            description=description,
            logo=logo,
            phone_number=phone_number,
            address=address,
        )
        rest.save()
        return rest


class RestaurantCommentSerializer(serializers.ModelSerializer):
    poster = serializers.CharField(read_only=True)
    restaurant = serializers.CharField(read_only=True)

    class Meta:
        model = Restaurant_Comment
        fields = '__all__'

    def validate(self, attrs):
        # print(f'attr = {attrs}')
        # print(f'{self.request.user.id}')

        return super().validate(attrs)

    def create(self, validated_data):
        # print('here')
        # print(self.validated_data)
        restaurant = validated_data.get('restaurant')
        content = validated_data.get('content')
        poster = validated_data.get('poster')
        time = datetime.datetime.now()
        notification = validated_data.get('notification')

        rest = Restaurant_Comment(
            restaurant=restaurant,
            poster=poster,
            content=content,
            time=time
        )

        rest.save()
        return rest

    # def update(self, instance, validated_data):
    #     # print("Hello")
    #     return super().update(instance, validated_data)


class FoodSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(read_only=True)

    class Meta:
        model = Food
        fields = '__all__'

    def create(self, validated_data):
        # print('here')
        # print(self.validated_data)
        name = validated_data.get('name')
        restaurant = validated_data.get('restaurant')
        description = validated_data.get('description')
        price = validated_data.get('price')
        images = validated_data.get('images')

        food = Food(
            name=name,
            restaurant=restaurant,
            price=price,
            description=description,
            images=images
        )
        food.save()
        return food
