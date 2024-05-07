from rest_framework import serializers

from .models import ContentModel

class ContentModelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ContentModel
        fields = '__all__'
