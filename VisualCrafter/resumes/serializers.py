from rest_framework import serializers
from .models import ResumeTemplate
from django.conf import settings

class ResumeTemplateSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = ResumeTemplate
        fields = ['id', 'name', 'is_premium', 'thumbnail']

    def get_thumbnail(self, obj):
        if obj.thumbnail:
            return self.context['request'].build_absolute_uri(obj.thumbnail.url)
        return None