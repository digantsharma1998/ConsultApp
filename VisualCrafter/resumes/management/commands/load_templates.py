from django.core.management.base import BaseCommand
from resumes.models import ResumeTemplate

class Command(BaseCommand):
    help = 'Loads default resume templates'

    def handle(self, *args, **options):
        templates = [
            {
                "name": "Modern Red",
                "thumbnail": "templates/modern-red.jpg",
                "html_content": "<div class='modern'>...<div>",
                "is_premium": True
            }
        ]

        for t in templates:
            ResumeTemplate.objects.create(**t)