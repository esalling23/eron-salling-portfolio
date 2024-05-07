from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Project, Category

# Import/export resource classes
class ProjectResource(resources.ModelResource):
		class Meta: 
				model = Project

class CategoryResource(resources.ModelResource):
		class Meta: 
				model = Category

# Custom Admin handling
class ProjectAdmin(ImportExportModelAdmin):
		resource_classes = [ProjectResource]

class CategoryAdmin(ImportExportModelAdmin):
		resource_classes = [CategoryResource]

admin.site.register(Project, ProjectAdmin)
admin.site.register(Category, CategoryAdmin)
