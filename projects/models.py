from django.db import models
from django.utils.translation import gettext_lazy as _

class Tool(models.Model):
		name = models.CharField(max_length=400)
		class ToolGroup(models.TextChoices):
				FRONTEND = 'FE', _('Frontend')
				BACKEND = 'BE', _('Backend')
				FULLSTACK = 'FS', _('Fullstack')
				GAMEDEV = 'GD', _('Game Development')
				DEVOPSCLOUD = 'DC', _('DevOps and Cloud Computing')
				DATABASES = 'DB', _('Databases')

		group = models.CharField(
				max_length=2,
				choices=ToolGroup.choices,
				default=ToolGroup.FULLSTACK,
		)

		def __str__(self):
				return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Project(models.Model):
    # Images
    main_img = models.ImageField()
    thumbnail_img = models.ImageField()
    # Details
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=400)

    date_started = models.DateField()
    # If `date_ended` is empty, this is a current project
    date_ended = models.DateField(null=True, blank=True)

    description = models.TextField()
    more_link = models.URLField(max_length=400, null=True, blank=True)
    git_link = models.URLField(max_length=400, null=True, blank=True)
    # Each project can have multiple categories
    categories = models.ManyToManyField(Category, blank=True)
    # Hide in front end
    is_hidden = models.BooleanField(default=False)

    def __str__(self):
        return self.title
