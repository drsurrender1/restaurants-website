from django.urls import path

from accounts.views import CreateUserView, UpdateUserView

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

app_name = "accounts"
urlpatterns = [
    path('profile/<int:id>/edit/', UpdateUserView.as_view(), name='update_user'),
    path('profile/register/', CreateUserView.as_view(), name='create_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
