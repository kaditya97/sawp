from django.http.response import HttpResponse
from geo.Geoserver import Geoserver
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework import status
from .models import *
from .serializer import *
from .suitability_calculation import *
import tempfile
import shutil
from pathlib import Path
import json
import ahpy

BASE_DIR = Path(__file__).resolve().parent.parent
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

# Project ViewSet
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    def get_queryset(self):
        return Project.objects.all()
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        project = Project.objects.all()
        serializers = ProjectSerializer(project, many=True)
        return Response(serializers.data)
    
    def patch(self, pk, taskid):
        print(taskid)
        instance = self.get_object(pk)
        serializer = ProjectSerializer(instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()
        project = Project.objects.all()
        serializers = ProjectSerializer(project, many=True)
        return Response(serializers.data)
    
    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Project.objects.get(pk=pk)
        self.perform_destroy(instance)
        project = Project.objects.all()
        serializers = ProjectSerializer(project, many=True)
        return Response(serializers.data)

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
        file_path = f"D:/project/sawp/sawp-backend/media/raster/{file_name}"
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
        file_path = f"D:/project/sawp/sawp-backend/media/vector/{file_name}"
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
        file_path = f"D:/project/sawp/sawp-backend/media/boundary/{file_name}"
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
        css = geo.get_coveragestores()
        return Suitability.objects.all()
    
    def create(self, request):
        overlay = Suitability_calculation()
        print(overlay)
        file_name = request.data.get('name') + '.tif'
        file_path = f"D:/project/sawp/sawp-backend/media/suitability/{file_name}"
        overlay.rio.to_raster(file_path)
        Suitability.objects.create(name=request.data.get('name'), description=request.data.get('description'), file_name=file_name, file="suitability/" + file_name)
        geo.create_coveragestore(layer_name=request.data.get('name'), path=file_path, workspace='sawp')
        suitability = Suitability.objects.all()
        serializers = SuitabilitySerializer(suitability, many=True)
        return Response(serializers.data)

    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Suitability.objects.get(pk=pk)
        name = instance.name
        self.perform_destroy(instance)
        geo.delete_coveragestore(coveragestore_name=name, workspace='sawp')
        suitability = Suitability.objects.all()
        serializers = SuitabilitySerializer(suitability, many=True)
        return Response(serializers.data)