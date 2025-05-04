import os
import django
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def run_setup():
    call_command('migrate')

    call_command('createsuperuse',
                 email='visual@example.com',
                 username='crafter',
                 interactive=False)

if __name__ == '__main__':
    run_setup()