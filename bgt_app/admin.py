from django.contrib import admin
from .models import (
    UserProfile,
    ToolSession,
    HpTracker,
)

admin.site.register(UserProfile)
admin.site.register(ToolSession)
admin.site.register(HpTracker)
