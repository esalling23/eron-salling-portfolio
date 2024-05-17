from rest_framework import serializers

from .models import Project, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Category
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    class Meta:
        model = Project
        fields = [
            'main_img', 
            'thumbnail_img', 
            'title', 
            'subtitle', 
            'date_started', 
            'date_ended', 
            'description', 
            'more_link', 
            'categories',
            'is_hidden'
        ]