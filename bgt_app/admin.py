from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.utils.http import urlencode

from .models import (
    UserProfile,
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
    ResourceGroup,
    Resource,
    ScoringGroup,
    ScoringCategory,
    Player,
    GameTimer,
    DrawBag,
    DrawBagItem,
)


admin.site.site_header = 'BoardGameTools Administration'


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'view_tool_sessions_link']

    def view_tool_sessions_link(self, obj):
        count = ToolSession.objects.filter(session_owner_id=obj.id).count()
        url = (
            reverse("admin:bgt_app_toolsession_changelist")
            + "?"
            + urlencode({"userprofile__id": f"{obj.id}"})
        )
        return format_html('<a href="{}">{} Tool Session(s)</a>', url, count)
    view_tool_sessions_link.short_description = "Tool Sessions"


class ToolSessionAdmin(admin.ModelAdmin):
    list_display = ['session_name', 'session_owner', 'creation_date']
    list_filter = ['session_owner']


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(ToolSession, ToolSessionAdmin)
admin.site.register(HpTracker)
admin.site.register(DieGroup)
admin.site.register(DieStandard)
admin.site.register(ResourceGroup)
admin.site.register(Resource)
admin.site.register(ScoringGroup)
admin.site.register(ScoringCategory)
admin.site.register(Player)
admin.site.register(GameTimer)
admin.site.register(DrawBag)
admin.site.register(DrawBagItem)




