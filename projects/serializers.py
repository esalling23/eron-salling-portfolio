from rest_framework import serializers

from .models import Project, Category, Tool

class ToolSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tool
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Category
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    class Meta:
        model = Project
        fields = [
						'id',
            'main_img', 
            'thumbnail_img', 
            'title', 
            'subtitle', 
            'date_started', 
            'date_ended', 
            'description', 
            'more_link', 
            'git_link',
            'categories',
            'is_hidden'
        ]