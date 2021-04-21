from django.core import serializers
from django.http import JsonResponse

from .models import Project

# Create your views here.
def projects_index(request):
    """Index request to list all projects"""
    projects = serializers.serialize('json', Project.objects.all())
    return JsonResponse({ 'projects': projects })
