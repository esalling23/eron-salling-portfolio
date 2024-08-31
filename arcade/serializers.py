from rest_framework import serializers

from .models import GameModel, ScoreModel

class ScoreModelSerializer(serializers.ModelSerializer):
		class Meta:
				model = ScoreModel
				fields = '__all__'

class GameModelSerializer(serializers.ModelSerializer):
		scores = ScoreModelSerializer(many=True)
		key = serializers.SerializerMethodField('get_key')
		
		def get_key(self, model):
			return model.name.lower().replace(' ', '-')

		class Meta:
				model = GameModel
				fields = ('name', 'description', 'howToPlaySteps', 'key', 'scores')
