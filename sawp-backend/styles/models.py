from django.db import models

class SldStyle(models.Model):
    name = models.CharField(max_length=100, blank=True)
    workspace = models.CharField(max_length=100, blank=True)
    number_of_class = models.IntegerField(blank=True, null=True, default=5)
    color_palette = models.CharField(
        max_length=1000, blank=True, default='Spectral_r')
    geom_type = models.CharField(max_length=10, blank=True, default='raster')
    classification_method = models.CharField(
        max_length=50, blank=True, default='natural_break')
    opacity = models.FloatField(blank=True, null=True, default=1)
    schema = models.CharField(max_length=100, blank=True, default='public')
    continuous_legend = models.BooleanField(blank=True, default=True)
    raster_min_val = models.IntegerField(null=True, blank=True)
    raster_max_val = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
