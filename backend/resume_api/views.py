from django.shortcuts import(
            render,
            get_object_or_404
)
from rest_framework import(
            generics,
            permissions,
            status
)
from rest_framework.response import Response
from .models import(
            ResumeTemplate,
            UserResume,
            ResumeReview
)
from .serializers import(
    ResumeTemplateSerializer,
    UserResumeSerializer,
    ResumeReviewSerializer
)

# Create your views here.

class ResumeTemplateList(generics.ListAPIView):
    queryset = ResumeTemplate.objects.all()
    serializer_class = ResumeTemplateSerializer
    permission_classes = [permissions.AllowAny]

class UserResumeListCreate(generics.ListCreateAPIView):
    serializer_class = UserResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserResume.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserResumeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserResume.objects.filter(user=self.request.user)
    
class ResumeReviewCreate(generics.CreateAPIView):
    serializer_class = ResumeReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        resume = get_object_or_404(UserResume, pk=self.kwargs['resume_id'])
        serializer.save(reviewer=self.request.user, resume=resume)

class ResumeReviewList(generics.ListAPIView):
    serializer_class = ResumeReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        resume = get_object_or_404(UserResume, pk=self.kwargs['resume_id'])
        return ResumeReview.objects.filter(resume=resume)