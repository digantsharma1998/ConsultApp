from django.http import JsonResponse
from .models import ResumeTemplate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ResumeTemplateSerializer

def template_list(request):
    templates = ResumeTemplate.objects.all().values('id', 'name', 'is_premium')
    return JsonResponse(list(templates), safe=False)

def resume_list(request):
    return JsonResponse({'message': 'Resume endpoint works!'})

@api_view(['GET'])
def template_list(request):
    templates = ResumeTemplate.objects.all()
    serializer = ResumeTemplateSerializer(templates, many=True, context={'request': request})
    return Response(serializer.data)