from django.http.response import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Project
from .serializer import ProjectSerializer
import json
import ahpy

class AHPViewSet(viewsets.ModelViewSet):
    def calculate_ahp(request):
        suitability_comparisons = {('school','fuel'):1/3, ('school','hospital'):1/2, ('fuel','hospital'): 3}
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
