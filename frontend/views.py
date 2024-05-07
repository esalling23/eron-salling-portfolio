from django.shortcuts import render
from django.http import JsonResponse

from .models import ContentModel
from .serializers import ContentModelSerializer

# Create your views here.
def index(request):
  return render(request, 'frontend/index.html')


def content_index(request):
    """Index request to display content"""
    content = ContentModel.objects.first()
    serializer = ContentModelSerializer(content)
    return JsonResponse({ 'content': serializer.data })
