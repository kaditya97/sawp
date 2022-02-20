from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(ClipVector)
admin.site.register(ClipRaster)
admin.site.register(MergeVectors)
admin.site.register(BufferVector)
admin.site.register(VectorToRaster)
admin.site.register(RasterToVector)
admin.site.register(VectorToShapefile)
admin.site.register(ShapefileToGeojson)
admin.site.register(PolygonToPoints)