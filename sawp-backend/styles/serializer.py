from rest_framework import serializers
from .models import Style, SldStyle


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = '__all__'


class SldStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SldStyle
        fields = '__all__'
