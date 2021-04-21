from django.urls import path
from .views import projects_index

urlpatterns = [
    path('projects/', projects_index, name='projects_index'),
]
