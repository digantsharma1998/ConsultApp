from django.db import models
from django.contrib.auth.models import User

class ResumeTemplate(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='templates/')
    html_content = models.TextField()
    is_premium = models.BooleanField(default=False)

class UserResume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(ResumeTemplate, on_delete=models.SET_NULL, null=True)
    content = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)