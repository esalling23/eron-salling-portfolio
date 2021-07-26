from django.core import serializers
from django.http import JsonResponse

from .models import Project
from .serializers import ProjectSerializer

# Create your views here.
def projects_index(request):
    """Index request to list all projects"""
    projects = Project.objects.all().order_by('-date_started')
    serializer = ProjectSerializer(projects, many=True)
    return JsonResponse({ 'projects': serializer.data })
