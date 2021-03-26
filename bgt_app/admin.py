from django.contrib import admin
from .models import (
    UserProfile,
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
)

admin.site.register(UserProfile)
admin.site.register(ToolSession)
admin.site.register(HpTracker)
admin.site.register(DieGroup)
admin.site.register(DieStandard)