"""
Django settings for portfolio project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
import sys
import dj_database_url

# .env config:
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

# Determine if we are on local or production
if os.getenv('ENV') == 'development':
    # If we are on development, use the `DB_NAME_DEV` value
    # from the .env file as the database name
    DB_NAME = os.getenv('DB_NAME_DEV')
    DB = {
      'ENGINE': 'django.db.backends.postgresql',
      'NAME': DB_NAME,
    }
    # Set debug to true
    DEBUG = True
    # Only allow locally running client at port 7165 for CORS
    CORS_ORIGIN_WHITELIST = ['http://localhost:7165']
else:
    DB = {
      'ENGINE': 'django.db.backends.postgresql_psycopg2',
      'NAME': os.getenv('DB_NAME_PROD'),
      'USER': os.getenv('DB_USER_NAME'),
      'PASSWORD': os.getenv('DB_USER_PASS'),
      'HOST': 'localhost',
      'PORT': ''
    }
    # Set debug to false
    DEBUG = False
    # Only allow the `CLIENT_ORIGIN` for CORS
    # CORS_ORIGIN_WHITELIST = [
    #     'http://eronsalling.com'
    # ]

    ALLOWED_HOSTS = ['eronsalling.com', '143.198.132.99', 'localhost']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
# Default database as defined above depending on development
# or production environment
DATABASES = {
    'default': DB
}

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# This uses either a .env key or Heroku config var called SECRET
SECRET_KEY = os.getenv('SECRET')

# Application definition

INSTALLED_APPS = [
    'frontend',
    'projects',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'storages',
    'webpack_loader',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend/webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
        'LOADER_CLASS': 'webpack_loader.loader.WebpackLoader',
    }
}

WSGI_APPLICATION = 'portfolio.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# AWS Settings
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_STORAGE_BUCKET_NAME = 'eron-portfolio'
AWS_S3_REGION_NAME = 'us-west-1'
AWS_DEFAULT_ACL = 'public-read'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend/assets'),
)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'