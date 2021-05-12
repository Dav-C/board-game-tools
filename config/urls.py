from django.contrib import admin
from django.urls import include, path
# These 2 imports are for development purposes only
# and should be removed when deployed
from django.conf import settings
from django.conf.urls.static import static

from bgt_app import urls as bgt_app_urls

urlpatterns = [
    path('admin', admin.site.urls),
    path('', include(bgt_app_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
