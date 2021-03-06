from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from bgt_app import urls as bgt_app_urls

urlpatterns = [
    path("admin", admin.site.urls),
    path("", include(bgt_app_urls)),
]
# serves media files when debug is True (non production environment)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
