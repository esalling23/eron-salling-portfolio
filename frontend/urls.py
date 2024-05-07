from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
		path('content/', views.content_index, name='content_index'),
]
