from rest_framework import serializers

from .models import GameModel, ScoreModel

class ScoreModelSerializer(serializers.ModelSerializer):
		class Meta:
				model = ScoreModel
				fields = '__all__'

class GameModelSerializer(serializers.ModelSerializer):
		scores = ScoreModelSerializer(many=True)
		class Meta:
				model = GameModel
				fields = '__all__'
