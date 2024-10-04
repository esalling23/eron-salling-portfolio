from django.urls import path
from .views import projects_index, categories_index, tools_index

urlpatterns = [
    path('tools/', tools_index, name='tools_index'),
    path('projects/', projects_index, name='projects_index'),
    path('categories/', categories_index, name='categories_index'),
]
