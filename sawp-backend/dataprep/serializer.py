from rest_framework import serializers
from .models import *

class ClipVectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClipVector
        fields = '__all__'

class ClipRasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClipRaster
        fields = '__all__'
    
class MergeVectorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MergeVectors
        fields = '__all__'

class BufferVectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BufferVector
        fields = '__all__'
    
class VectorToRasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorToRaster
        fields = '__all__'

class RasterToVectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RasterToVector
        fields = '__all__'
    
class VectorToShapefileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorToShapefile
        fields = '__all__'

class ShapefileToGeojsonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShapefileToGeojson
        fields = '__all__'
    
class PolygonToPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolygonToPoints
        fields = '__all__'