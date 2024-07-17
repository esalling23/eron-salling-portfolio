from django.db import models
from django.contrib.postgres.fields import ArrayField

class GameModel(models.Model):
		name = models.CharField(max_length=1000)
		description = models.TextField()
		howToPlaySteps = ArrayField(
			models.TextField(),
			blank=True
		)

		def __str__(self):
				return self.name

class ScoreModel(models.Model):
		user = models.CharField(max_length=500)
		score = models.IntegerField()
		game = models.ForeignKey(
			GameModel,
			on_delete = models.CASCADE,
			related_name = 'scores'
		)