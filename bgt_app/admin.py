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
    ScoringCategorySimple,
    ScoringCategoryItemsPerPoint,
    ScoringCategoryPointsPerItem,
)

admin.site.register(UserProfile)
admin.site.register(ToolSession)
admin.site.register(HpTracker)
admin.site.register(DieGroup)
admin.site.register(DieStandard)
admin.site.register(ResourceGroup)
admin.site.register(Resource)
admin.site.register(ScoringGroup)
admin.site.register(ScoringCategorySimple)
admin.site.register(ScoringCategoryItemsPerPoint)
admin.site.register(ScoringCategoryPointsPerItem)
