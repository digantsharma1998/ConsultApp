import os
import django
from django.core.management import call_command
from django.contrib.auth.hashers import make_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def run_setup():
    call_command('migrate')

    call_command('createsuperuser',
                 email='visual@example.com',
                 username='crafter',
                 password=make_password('Crafter@8'),
                 interactive=False)

if __name__ == '__main__':
    run_setup()