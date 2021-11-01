from rest_framework import serializers
from .models import Styles, SldStyle


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Styles
        fields = '__all__'


class SldStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SldStyle
        fields = '__all__'
