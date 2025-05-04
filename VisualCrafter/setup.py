import os
import django
from django.core.management import call_command
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def run_setup():
    call_command('migrate')

    User = get_user_model()
    if not User.objects.filter(username='admin').exists:
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password=make_password('Crafter@8')
        )

if __name__ == '__main__':
    run_setup()