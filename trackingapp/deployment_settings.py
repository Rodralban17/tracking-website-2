import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ.get('RENDER_EXTERNAL_HOSTNAME')]
CSRF_TRUSTED_ORIGINS = ['https://'+os.environ.get('RENDER_EXTERNAL_HOSTNAME')]

DEBUG = TRUE
SECRET_KEY = os.environ.get('SECRET_KEY')
# BREVO_API_KEY = os.environ.get('BREVO_API_KEY')
# DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "https://tracking-website-2.onrender.com",
    # "https://deltallogistics.com",
    # "https://www.deltallogistics.com"
]
ALLOWED_HOSTS = [
    ".onrender.com",
    "127.0.0.1"
]
CORS_ALLOW_CREDENTIALS = True
STORAGES = {
    "default":{
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles":{
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

DATABASES = {
    "default": dj_database_url.config(
        default = os.environ['DATABASE_URL'],
        conn_max_age = 600
    )
}

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True

# EMAIL_HOST_USER = 'albanrodrigue10@gmail.com'
# EMAIL_HOST_PASSWORD = 'vlly aaae ixex waov'
# DEFAULT_FROM_EMAIL = 'Cargo Nexus <cargonexus@gmail.com>'