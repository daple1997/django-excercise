from django.urls import path
from . import views 

urlpatterns = [
    path('items/', views.ItemList.as_view(), name='item-list'),
]