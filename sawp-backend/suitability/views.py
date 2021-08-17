from django.http.response import HttpResponse
from rest_framework import parsers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework.serializers import Serializer
from .models import *
from .serializer import *
import json
import ahpy

# class AHPViewSet(viewsets.ModelViewSet):
@api_view(['GET', 'POST'])
def calculate_ahp(request):
        suitability_comparisons = {('school','fuel'): 1/3, ('school','hospital'): 1/2, ('fuel','hospital'): 3}
        suitability = ahpy.Compare(name='Suitability', comparisons=suitability_comparisons, precision=3, random_index='saaty')
        data = {'weights': suitability.target_weights, 'consistency_ratio': suitability.consistency_ratio}
        return HttpResponse( json.dumps( data ) )

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
        raster = Raster.objects.all()
        serializers = RasterSerializer(raster, many=True)
        return Response(serializers.data)

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
        vector = Vector.objects.all()
        serializers = VectorSerializer(vector, many=True)
        return Response(serializers.data)

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
        boundary = Boundary.objects.all()
        serializers = BoundarySerializer(boundary, many=True)
        return Response(serializers.data)