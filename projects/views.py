from django.core import serializers
from django.http import JsonResponse

from .models import Project, Category
from .serializers import ProjectSerializer, CategorySerializer

# Create your views here.
def projects_index(request):
    """Index request to list all projects"""
    projects = Project.objects.filter(is_hidden=False).order_by('-date_started')
    serializer = ProjectSerializer(projects, many=True)
    return JsonResponse({ 'projects': serializer.data })

def categories_index(request):
    """Index request to list all categories"""
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse({ 'categories': serializer.data })