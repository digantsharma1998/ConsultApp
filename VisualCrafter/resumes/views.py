from django.http import JsonResponse
from .models import ResumeTemplate

def template_list(request):
    templates = ResumeTemplate.objects.all().values('id', 'name', 'is_premium')
    return JsonResponse(list(templates), safe=False)

def resume_list(request):
    return JsonResponse({'message': 'Resume endpoint works!'})