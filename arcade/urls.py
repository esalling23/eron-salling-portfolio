from django.urls import path
from .views import Scores, Games

urlpatterns = [
		path('scores/', Scores.as_view(), name='scores'),
		path('games/', Games.as_view(), name='games'),
]
