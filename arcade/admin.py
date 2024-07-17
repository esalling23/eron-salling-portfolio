from django.contrib import admin

from .models import GameModel, ScoreModel

# Register your models here.
admin.site.register(GameModel)
admin.site.register(ScoreModel)