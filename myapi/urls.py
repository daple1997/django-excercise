from django.urls import path, include
from . import views 

urlpatterns = [
    path('items/', views.ItemList.as_view(), name='item-list'),
    path('', views.index, name='index'),
]