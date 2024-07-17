from django.shortcuts import render
from django.http import JsonResponse

from .models import ContentModel
from .serializers import ContentModelSerializer

# Serve frontend HTML
def index(request):
  return render(request, 'frontend/index.html')


# Content API endpoint
def content_index(request):
    """Index request to display content"""
    content = ContentModel.objects.first()
    serializer = ContentModelSerializer(content)
    return JsonResponse({ 'content': serializer.data })
