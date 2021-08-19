from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name

class Raster(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    file_name = models.CharField(max_length=100, null=True)
    file = models.FileField(upload_to='raster/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Vector(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    file_name = models.CharField(max_length=100, null=True)
    file = models.FileField(upload_to='vector/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Boundary(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    file_name = models.CharField(max_length=100, null=True)
    file = models.FileField(upload_to='boundary/', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Suitability(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # project = models.ForeignKey(Project, on_delete=models.CASCADE)
    # raster = models.ForeignKey(Raster, on_delete=models.CASCADE)
    # vector = models.ForeignKey(Vector, on_delete=models.CASCADE)
    # boundary = models.ForeignKey(Boundary, on_delete=models.CASCADE)
    suitability = models.FloatField()
    suitability_type = models.CharField(max_length=50)
    suitability_comment = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.suitability_type

