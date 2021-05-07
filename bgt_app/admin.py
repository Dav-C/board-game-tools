from django.contrib import admin
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

admin.site.register(UserProfile)
admin.site.register(ToolSession)
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

