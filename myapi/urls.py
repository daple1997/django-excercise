from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path("", views.index, name="index"),
    path("items/", views.ItemList.as_view(), name="item-list"),
    path("items/<int:pk>/", views.ItemDetailView.as_view(), name="item-detail"),
    path("api/", include(router.urls)),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
]
