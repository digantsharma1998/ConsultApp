import os
import django
from django.core.management import call_command
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def create_superuser():
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password=os.getenv('ADMIN_PASSWORD', 'defaultpassword123')
        )
        print("Superuser created successfully.")
    else:
        print("Superuser already exists.")

if __name__ == '__main__':
    call_command('migrate')
    create_superuser()