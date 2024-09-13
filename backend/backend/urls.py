from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, CreateUserInfoView, get_csrf_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user_info/register/", CreateUserInfoView.as_view(), name="register_userinfo"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/csrf", get_csrf_token, name="get_csrf_token"),
    path("api-auth", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
