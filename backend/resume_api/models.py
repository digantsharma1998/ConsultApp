from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class ResumeTemplate(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='templates/thumbnails/')
    html_content = models.TextField(help_text="HTML template with placeholders")
    css_content = models.TextField(help_text="CSS for the template")
    is_premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class UserResume(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='resumes')
    template = models.ForeignKey(ResumeTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    content = models.JSONField(default=dict)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Resume: {self.title}"

class ResumeReview(models.Model):
    resume = models.ForeignKey(UserResume, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    comments = models.JSONField(default=list)
    overall_rating = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Review for {self.resume.title} by {self.reviewer.username}"