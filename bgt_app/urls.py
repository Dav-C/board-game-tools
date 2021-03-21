from django.urls import path

from .views import (
    Login,
    Logout,
    UserHome,
    ToolSessionDetail,
    AddHpTracker,
    HpChangeValue,
)

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('home/', UserHome.as_view(), name='user_home'),
    path('tool-session/<str:slug>/',
         ToolSessionDetail.as_view(), name='tool_session_detail'),
    path('add-hp-tracker/',
         AddHpTracker.as_view(), name='add_hp_tracker'),
    path('hp-change-value/<uuid>',
         HpChangeValue.as_view(), name='hp_change_value')
]