from django.core import serializers
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import generics, status

from .models import GameModel, ScoreModel
from .serializers import GameModelSerializer, ScoreModelSerializer

# Games
class Games(generics.ListAPIView):
		queryset = GameModel.objects.all()
		def get(self, request):
				"""Index request to list all games"""
				games = GameModel.objects.all()
				serializer = GameModelSerializer(games, many=True)
				return Response(serializer.data)

# Scores
class Scores(generics.ListCreateAPIView):
		queryset = ScoreModel.objects.all()
		def get(self, request):
				"""Index request"""
				if 'game' in request.GET:
						scores = ScoreModel.objects.filter(game=request.GET['game'])
				else:
						scores = ScoreModel.objects.all()
				data = ScoreModelSerializer(scores, many=True).data
				return Response(data)

		serializer_class = ScoreModelSerializer
		def post(self, request):
				"""Create request"""
				print(request.data)
				# Add user to request object
				# request.data['score']['owner'] = request.user.id
				# Serialize/create score
				score = ScoreModelSerializer(data=request.data)
				if score.is_valid():
						m = score.save()
						return Response(score.data, status=status.HTTP_201_CREATED)
				else:
						return Response(score.errors, status=status.HTTP_400_BAD_REQUEST)

