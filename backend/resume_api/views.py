from django.shortcuts import(
            render,
            get_object_or_404
)
from rest_framework import(
            generics,
            permissions,
            status,
            viewsets
)
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .models import(
            ResumeTemplate,
            UserResume,
            ResumeReview
)
from .serializers import(
    ResumeTemplateSerializer,
    UserResumeSerializer,
    ResumeReviewSerializer,
    UserSerializer
)

# Create your views here.

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                         context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            token = Token.objects.create(user=user)
            return Response({
                'token': token.key,
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

# views.py
class UserResumeViewSet(viewsets.ModelViewSet):
    queryset = UserResume.objects.all()
    serializer_class = UserResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)