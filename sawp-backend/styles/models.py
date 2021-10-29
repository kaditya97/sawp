from django.db import models


# Create your models here.
class Styles(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class SldStyle(models.Model):
    name = models.CharField(max_length=100, blank=True)
    style_type = models.CharField(max_length=100, blank=True, default='simple')
    workspace = models.CharField(max_length=100, blank=True)
    attribute_name = models.CharField(max_length=100, blank=True)
    number_of_class = models.IntegerField(blank=True, null=True, default=5)
    color_palette = models.CharField(
        max_length=1000, blank=True, default='Spectral_r')
    geom_type = models.CharField(max_length=10, blank=True, default='polygon')
    classification_method = models.CharField(
        max_length=50, blank=True, default='natural_break')
    fill_color = models.CharField(max_length=20, blank=True, default='#ffffff')
    stroke_color = models.CharField(
        max_length=20, blank=True, default='#333333')
    stroke_width = models.IntegerField(blank=True, null=True, default=1)
    opacity = models.FloatField(blank=True, null=True, default=1)

    schema = models.CharField(max_length=100, blank=True, default='public')
    pg_table_name = models.CharField(max_length=100, blank=True)

    point_size = models.IntegerField(null=True, blank=True, default=6)
    well_known_name = models.CharField(
        max_length=20, blank=True, default='circle')
    point_rotation = models.IntegerField(null=True, blank=True, default=0)
    stroke_linecap = models.CharField(
        max_length=20, blank=True, default='round')
    stroke_dasharray = models.CharField(max_length=20, blank=True)
    perpendicular_offset = models.CharField(max_length=20, blank=True)

    feature_label = models.BooleanField(blank=True, default=False)
    font_family = models.CharField(
        max_length=100, blank=True, default='Aerial')
    font_color = models.CharField(max_length=20, blank=True, default='#333333')
    font_size = models.IntegerField(null=True, blank=True, default=14)
    font_weight = models.CharField(max_length=20, blank=True, default='normal')
    font_style = models.CharField(max_length=20, blank=True, default='normal')
    halo_color = models.CharField(max_length=20, blank=True, default='#ffffff')
    halo_radius = models.IntegerField(null=True, blank=True, default=1)

    continuous_legend = models.BooleanField(blank=True, default=True)
    raster_min_val = models.IntegerField(null=True, blank=True)
    raster_max_val = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
