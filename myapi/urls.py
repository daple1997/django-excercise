from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("items/", views.ItemList.as_view(), name="item-list"),
    path("items/<int:pk>/", views.ItemDetailView.as_view(), name="item-detail"),
]
