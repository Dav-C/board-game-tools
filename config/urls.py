from django.contrib import admin
from django.urls import include, path

from bgt_app import urls as bgt_app_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(bgt_app_urls)),
]
