from django.db import models
from matplotlib.pyplot import cla

# Create your models here.
class ClipVector(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/clipvector/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class ClipRaster(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/clipraster/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class MergeVectors(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/mergevectors/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class BufferVector(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/buffervector/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class VectorToRaster(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/vectortoraster/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class RasterToVector(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/rastertovector/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class VectorToShapefile(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/vectortoshapefile/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class ShapefileToGeojson(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/shapefiletogeojson/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class PolygonToPoints(models.Model):
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='dataprep/polygontopoints/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name