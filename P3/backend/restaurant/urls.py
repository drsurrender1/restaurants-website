from django.urls import path

from restaurant.views.restaurantviews import *
from restaurant.views.restcommview import *
from restaurant.views.foodview import *

from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "restaurant"
urlpatterns = [
    path('search/', SearchRestaurantView.as_view(), name='search_restaurant'),
    path('add/', CreateRestaurantView.as_view(), name='create_restaurant'),
    path('<int:rest_id>/', RestaurantView.as_view(), name='view_restaurant'),
    path('<int:rest_id>/edit/', UpdateRestaurantView.as_view(),
         name='update_restaurant'),
    path('<int:id>/getrest/', GetRestaurantView.as_view(),
             name='getrest'),

    path('<int:rest_id>/follow/', FollowORUnfoRestaurantView.as_view(), name='followorunfollow'),
    path('<int:rest_id>/like/', LikeOrUnlikeRestaurant.as_view(), name='likeorunlike'),

    path('<int:rest_id>/menu/', MenuView.as_view(), name='view_menu'),
    path('<int:rest_id>/menu/add/', CreateFoodView.as_view(), name='add_food'),
    #DeleteFoodView
    path('<int:rest_id>/menu/<int:food_id>/delete/', DeleteFoodView.as_view(), name='delete_food'),
    path('<int:rest_id>/menu/<int:food_id>/edit/', UpdateFoodView.as_view(), name='update_food'),

    path('<int:rest_id>/blogs/', RestBlogView.as_view(), name='view_rest_blog'),
    path('<int:rest_id>/comments/', RestaurantCommentView.as_view(), name='view_rest_comm'),
    path('<int:rest_id>/comments/add/', CreateRestaurantCommentView.as_view(), name='create_rest_comm'),
    path('<int:rest_id>/comments/<int:rest_comm_id>/edit/', UpdateRestaurantCommentView.as_view(), name='update_rest_comm'),
        #DeleteRestCommentView
    path('<int:rest_id>/comments/<int:rest_comm_id>/delete/', DeleteRestCommentView.as_view(), name='delete_rest_comm'),

]
