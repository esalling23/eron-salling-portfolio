from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Project, Category, Tool

# Import/export resource classes
class ProjectResource(resources.ModelResource):
		class Meta: 
				model = Project

class CategoryResource(resources.ModelResource):
		class Meta: 
				model = Category

# Custom Admin handling
class ProjectAdmin(ImportExportModelAdmin):
		list_display = ("title", "subtitle", "date_started")
		resource_classes = [ProjectResource]

class CategoryAdmin(ImportExportModelAdmin):
		resource_classes = [CategoryResource]


class ToolResource(resources.ModelResource):
		class Meta: 
				model = Tool

# Custom Admin handling
class ToolAdmin(ImportExportModelAdmin):
		resource_classes = [ToolResource]

admin.site.register(Project, ProjectAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tool, ToolAdmin)
