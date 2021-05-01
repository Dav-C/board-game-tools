from django.urls import path

from .views import (
    CreateUser,
    Login,
    Logout,
    UserHome,
    ToolSessionDetail,
    PlayerCreate,
    PlayerDelete,
    PlayerScoreUpdate,
    PlayerRandomizeOrder,
    AddHpTracker,
    HpTrackerUpdate,
    HpTrackerDelete,
    AddDieGroup,
    DieGroupUpdate,
    DieGroupDelete,
    DieStandardDelete,
    AddDieStandard,
    RollDieGroup,
    RollDie,
    ResourceGroupCreate,
    ResourceGroupUpdate,
    ResourceGroupDelete,
    ResourceCreate,
    ResourceDelete,
    ResourceNameChange,
    ResourceQtyChange,
    ResourceProductionModifierChange,
    GameTimerCreate,
    ScoringGroupCreate,
    ScoringGroupUpdate,
    ScoringGroupDelete,
    ScoringGroupAddPlayers,
    ScoringCategoryCreate,
    ScoringCategoryDelete,
)

urlpatterns = [
    path('create-user/', CreateUser.as_view(), name='create_user'),

    path('login/', Login.as_view(), name='login'),

    path('logout/', Logout.as_view(), name='logout'),

    path('home/', UserHome.as_view(), name='user_home'),

    path('tool-session/<str:slug>/',
         ToolSessionDetail.as_view(), name='tool_session_detail'),

    path('player-create/',
         PlayerCreate.as_view(), name='player_create'),

    path('player-delete/<player_uuid>',
         PlayerDelete.as_view(), name='player_delete'),

    path('player-randomize-order/',
         PlayerRandomizeOrder.as_view(), name='player_randomize_order'),

    path('add-hp-tracker/',
         AddHpTracker.as_view(), name='add_hp_tracker'),

    path('hp-tracker-update/<hp_tracker_uuid>',
         HpTrackerUpdate.as_view(), name='hp_tracker_update'),

    path('hp-tracker-delete/<uuid>',
         HpTrackerDelete.as_view(), name='hp_tracker_delete'),

    path('add-die-group/',
         AddDieGroup.as_view(), name='add_die_group'),

    path('die-group-update/<die_group_uuid>',
         DieGroupUpdate.as_view(), name='die_group_update'),

    path('die-group-delete/<uuid>',
         DieGroupDelete.as_view(), name='die_group_delete'),

    path('die-standard-delete/<uuid>',
         DieStandardDelete.as_view(), name='die_standard_delete'),

    path('add-die-standard/<die_group_uuid>',
         AddDieStandard.as_view(), name='add_die_standard'),

    path('roll-die-group/<die_group_uuid>',
         RollDieGroup.as_view(), name='roll_die_group'),

    path('roll-single-die/<die_uuid>',
         RollDie.as_view(), name='roll_die'),

    path('resource-group-create/',
         ResourceGroupCreate.as_view(), name='resource_group_create'),

    path('resource-group-update/<resource_group_uuid>',
         ResourceGroupUpdate.as_view(), name='resource_group_update'),

    path('resource-group-delete/<resource_group_uuid>',
         ResourceGroupDelete.as_view(), name='resource_group_delete'),

    path('resource-create/<resource_group_uuid>',
         ResourceCreate.as_view(), name='resource_create'),

    path('resource-delete/<resource_uuid>',
         ResourceDelete.as_view(), name='resource_delete'),

    path('resource-name-change/<resource_uuid>',
         ResourceNameChange.as_view(), name='resource_name_change'),

    path('resource-qty-change/<resource_uuid>',
         ResourceQtyChange.as_view(), name='resource_qty_change'),

    path('resource-production-modifier-change/<resource_uuid>',
         ResourceProductionModifierChange.as_view(),
         name='resource_production_modifier_change'),

    path('game-timer-create/',
         GameTimerCreate.as_view(), name='game_timer_create'),

    path('scoring-group-create/',
         ScoringGroupCreate.as_view(), name='scoring_group_create'),

    path('scoring-group-update/<scoring_group_uuid>',
         ScoringGroupUpdate.as_view(), name='scoring_group_update'),

    path('scoring-group-delete/<scoring_group_uuid>',
         ScoringGroupDelete.as_view(), name='scoring_group_delete'),

    path('scoring-group-add-players/<scoring_group_uuid>',
         ScoringGroupAddPlayers.as_view(),
         name='scoring_group_add_players'),

    path('scoring-category-create/<scoring_group_uuid>',
         ScoringCategoryCreate.as_view(),
         name='scoring_category_create'),

    path('scoring-category-delete/<category_uuid>',
         ScoringCategoryDelete.as_view(),
         name='scoring_category_delete'),

    path('player-score-update/<player_uuid>',
         PlayerScoreUpdate.as_view(),
         name='player_score_update'),

    # path('scoring-category-name-change/<category_uuid>',
    #      ScoringCategoryNameChange.as_view(),
    #      name='scoring_category_name_change'),
    #
    # path('scoring-category-update/<category_uuid>',
    #      ScoringCategoryPointsUpdate.as_view(),
    #      name='scoring_category_points_update'),
]
