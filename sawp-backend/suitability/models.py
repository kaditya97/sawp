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
    # file = models.FileField()

    def __str__(self):
        return self.name