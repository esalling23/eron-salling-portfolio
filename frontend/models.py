from django.db import models
from django.contrib.postgres.fields import ArrayField

class ContentModel(models.Model):
		home_title = models.CharField(max_length=3000)
		about_description = models.TextField()
		about_img = models.ImageField()
		typewriter_texts = ArrayField(
			models.CharField(max_length=100),
			blank=True
		)
