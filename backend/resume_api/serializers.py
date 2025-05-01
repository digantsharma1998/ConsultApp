from rest_framework import serializers
from .models import(
            ResumeTemplate,
            UserResume,
            ResumeReview
)
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ResumeTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeTemplate
        fields = '__all__'

class UserResumeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    template = ResumeTemplateSerializer(read_only=True)
    template_id = serializers.PrimaryKeyRelatedField(
        queryset = ResumeTemplate.objects.all(),
        source = 'template',
        write_only = True
    )
    
    class Meta:
        model = UserResume
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class ResumeReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    resume = UserResumeSerializer(read_only=True)
    resume_id = serializers.PrimaryKeyRelatedField(
        queryset = UserResume.objects.all(),
        source = 'resume',
        write_only = True
    )

    class Meta:
        model = ResumeReview
        fields = '__all__'
        read_only_fields = ['reviewer', 'created_at', 'updated_at']