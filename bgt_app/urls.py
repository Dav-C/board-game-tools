from django.urls import path

from .views import (
    Login,
    Logout,
    UserHome,
    ToolSessionDetail,
    AddHpTracker,
    HpTrackerUpdate,
    HpTrackerDelete,
    AddDieGroup,
)

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('home/', UserHome.as_view(), name='user_home'),
    path('tool-session/<str:slug>/',
         ToolSessionDetail.as_view(), name='tool_session_detail'),
    path('add-hp-tracker/',
         AddHpTracker.as_view(), name='add_hp_tracker'),
    path('hp-tracker-update/<uuid>',
         HpTrackerUpdate.as_view(), name='hp_tracker_update'),
    path('hp-tracker-delete/<uuid>',
         HpTrackerDelete.as_view(), name='hp_tracker_delete'),
    path('add-die-group/',
         AddDieGroup.as_view(), name='add_die_group'),
]