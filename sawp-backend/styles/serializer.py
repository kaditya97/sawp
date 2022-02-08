from rest_framework import serializers
from .models import SldStyle

class SldStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SldStyle
        fields = '__all__'
