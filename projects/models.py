from django.db import models

# Create your models here.
class Project(models.Model):
    # Images
    main_img = models.ImageField()
    thumbnail_img = models.ImageField()
    # Details
    title = models.CharField(max_length=100)
    date_started = models.DateField()
    # If `date_ended` is empty, this is a current project
    date_ended = models.DateField(null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.title
