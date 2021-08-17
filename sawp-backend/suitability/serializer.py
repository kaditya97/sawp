from rest_framework import serializers
from .models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class RasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raster
        fields = '__all__'

class VectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vector
        fields = '__all__'

class BoundarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Boundary
        fields = '__all__'