from django.http.response import HttpResponse
from geo.Geoserver import Geoserver
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from .models import *
from .serializer import *
from .suitability_calculation import *
from styles.models import SldStyle
from django.http import Http404, HttpResponse, FileResponse
from pathlib import Path
import json, os
import ahpy

BASE_DIR = Path(__file__).resolve().parent.parent
base = str(BASE_DIR).replace('\\', '/')
geo = Geoserver('http://localhost:8080/geoserver', username='admin', password='geoserver')

# class AHPViewSet(viewsets.ModelViewSet):
@api_view(['GET', 'POST'])
def calculate_ahp(request):
    arr = request.data
    ahp = {}
    for data in arr:
        mainkey = next(iter(data.values()))
        for key, value in sorted(data.items()):
            if mainkey != value and mainkey != key:
                keyv = (mainkey, key)
                ahpkey = tuple(sorted(keyv))
                if ahpkey not in ahp:
                    ahp[ahpkey] = value
    suitability = ahpy.Compare(name='Suitability', comparisons=ahp, precision=3, random_index='saaty')
    data = {'weights': suitability.target_weights, 'consistency_ratio': suitability.consistency_ratio}
    return HttpResponse( json.dumps( data ) )

# Raster Viewset
class RasterViewSet(viewsets.ModelViewSet):
    queryset = Raster.objects.all()
    serializer_class = RasterSerializer
    parsers = (MultiPartParser, FormParser)
    def get_queryset(self):
        return Raster.objects.all()

    def create(self, request):
        Serializer = self.get_serializer(data=request.data)
        Serializer.is_valid(raise_exception=True)
        self.perform_create(Serializer)
        name = request.data.get('name')
        file_name = request.data.get('file_name')
        file_path = f"{base}/media/raster/{file_name}"
        geo.create_coveragestore(layer_name=name, path=file_path, workspace='sawp')
        raster = Raster.objects.all()
        serializers = RasterSerializer(raster, many=True)
        return Response(serializers.data)
    
    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Raster.objects.get(pk=pk)
        name = instance.name
        self.perform_destroy(instance)
        geo.delete_coveragestore(coveragestore_name=name, workspace='sawp')
        raster = Raster.objects.all()
        serializers = RasterSerializer(raster, many=True)
        return Response(serializers.data)

# Vector Viewset
class VectorViewSet(viewsets.ModelViewSet):
    queryset = Vector.objects.all()
    serializer_class = VectorSerializer
    parsers = (MultiPartParser, FormParser)
    def get_queryset(self):
        return Vector.objects.all()

    def create(self, request):
        Serializer = self.get_serializer(data=request.data)
        Serializer.is_valid(raise_exception=True)
        self.perform_create(Serializer)
        name = request.data.get('name')
        file_name = request.data.get('file_name')
        file_path = f"{base}/media/vector/{file_name}"
        geo.create_shp_datastore(path=file_path, store_name=name, workspace='sawp')
        vector = Vector.objects.all()
        serializers = VectorSerializer(vector, many=True)
        return Response(serializers.data)
    
    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Vector.objects.get(pk=pk)
        self.perform_destroy(instance)
        geo.delete_featurestore(featurestore_name=instance.name, workspace='sawp')
        vector = Vector.objects.all()
        serializers = VectorSerializer(vector, many=True)
        return Response(serializers.data)

# Boundary Viewset
class BoundaryViewSet(viewsets.ModelViewSet):
    queryset = Boundary.objects.all()
    serializer_class = BoundarySerializer
    parsers = (MultiPartParser, FormParser)
    def get_queryset(self):
        return Boundary.objects.all()

    def create(self, request):
        Serializer = self.get_serializer(data=request.data)
        Serializer.is_valid(raise_exception=True)
        self.perform_create(Serializer)
        name = request.data.get('name')
        file_name = request.data.get('file_name')
        file_path = f"{base}/media/boundary/{file_name}"
        geo.create_shp_datastore(path=file_path, store_name=name, workspace='sawp')
        boundary = Boundary.objects.all()
        serializers = BoundarySerializer(boundary, many=True)
        return Response(serializers.data)
    
    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Boundary.objects.get(pk=pk)
        self.perform_destroy(instance)
        geo.delete_featurestore(featurestore_name=instance.name, workspace='sawp')
        boundary = Boundary.objects.all()
        serializers = BoundarySerializer(boundary, many=True)
        return Response(serializers.data)

# Suitability Viewset
class SuitabilityViewSet(viewsets.ModelViewSet):
    queryset = Suitability.objects.all()
    serializer_class = SuitabilitySerializer
    parsers = (MultiPartParser, FormParser)
    def get_queryset(self):
        return Suitability.objects.all()
    
    def create(self, request):
        overlay = Suitability_calculation(request.data.get('weights'), request.data.get('boundary'))
        file_name = request.data.get('sname') + '.tif'
        file_path = f"{base}/media/suitability/{file_name}"
        overlay.rio.to_raster(file_path)
        Suitability.objects.create(name=request.data.get('sname'), description=request.data.get('description'), file_name=file_name, file="suitability/" + file_name)
        SldStyle.objects.create(name=request.data.get('sname'), workspace='sawp')
        geo.create_coveragestore(layer_name=request.data.get('sname'), path=file_path, workspace='sawp')
        suitability = Suitability.objects.all()
        serializers = SuitabilitySerializer(suitability, many=True)
        return Response(serializers.data)

    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Suitability.objects.get(pk=pk)
        name = instance.name
        self.perform_destroy(instance)
        SldStyle.objects.filter(name=name).delete()
        geo.delete_coveragestore(coveragestore_name=name, workspace='sawp')
        geo.delete_style(style_name=name, workspace='sawp')
        suitability = Suitability.objects.all()
        serializers = SuitabilitySerializer(suitability, many=True)
        return Response(serializers.data)

@api_view(['GET'])
def download(self, type, pk):
    if type == 'suitability':
        instance = Suitability.objects.get(id=pk)
    elif type == 'raster':
        instance = Raster.objects.get(id=pk)
    elif type == 'vector':
        instance = Vector.objects.get(id=pk)
    else: 
        instance = Boundary.objects.get(id=pk)
    file_name = instance.file_name
    file_path = f"{base}/media/{type}/{file_name}"
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), as_attachment=True)
    else:
        raise Http404