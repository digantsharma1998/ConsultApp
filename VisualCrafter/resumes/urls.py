from django.urls import path
from . import views

urlpatterns = [
    path('template/', views.template_list, name='template-list'),
    path('resumes/', views.resume_list, name='resume-list'),
]