from django.urls import path
from .import views

urlpatterns = [
    path('templates/', views.ResumeTemplateList.as_view(), name='template-list'),
    path('resumes/', views.UserResumeListCreate.as_view(), name='resume-list'),
    path('resumes/<int:pk>/', views.UserResumeDetail.as_view(), name='resume-detail'),
    path('resumes/<int:resume_id>/reviews/', views.ResumeReviewList.as_view(), name='review-list'),
    path('resumes/<int:resume_id>/reviews/create/', views.ResumeReviewCreate.as_view(), name='review-create'),
]