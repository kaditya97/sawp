from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Project)
admin.site.register(Raster)
admin.site.register(Vector)
admin.site.register(Boundary)