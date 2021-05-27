from django.urls import path
from .views import (
    CreateUser,
    Login,
    Logout,
    UserHome,
    ToolSessionDetail,
    PlayerView,
    PlayerRandomizeOrder,
    HpTrackerCreate,
    HpTrackerUpdate,
    HpTrackerDelete,
    DieGroupCreate,
    DieGroupUpdate,
    DieGroupDelete,
    DieStandardDelete,
    DieStandardCreate,
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
    GameTimerDelete,
    GameTimerTitleUpdate,
    GameTimerDurationUpdate,
    ScoringGroupCreate,
    ScoringGroupUpdate,
    ScoringGroupDelete,
    ScoringGroupAddPlayers,
    ScoringCategoryCreate,
    ScoringCategoryDelete,
    DrawBagCreate,
    DrawBagDelete,
    DrawBagUpdate,
    DrawBagItemDelete,
    DrawBagDrawRandomItem,
    DrawBagItemReturn,
    DrawBagItemDraw,
    DrawBagReset,
    DrawBagItemCreate,
)

urlpatterns = [
    path('create-user', CreateUser.as_view(), name='create_user'),

    path('login', Login.as_view(), name='login'),

    path('logout', Logout.as_view(), name='logout'),

    path('home', UserHome.as_view(), name='user_home'),

    path('tool-session/<str:slug>/',
         ToolSessionDetail.as_view(), name='tool_session_detail'),

    path('player-create/',
         PlayerView.as_view(), name='player_create'),

    path('player-delete/<player_uuid>',
         PlayerView.as_view(), name='player_delete'),

    path('player-update/<player_uuid>',
         PlayerView.as_view(), name='player_update'),

    path('player-randomize-order/',
         PlayerRandomizeOrder.as_view(), name='player_randomize_order'),

    path('hp-tracker-create/',
         HpTrackerCreate.as_view(), name='hp_tracker_create'),

    path('hp-tracker-delete/<uuid>',
         HpTrackerDelete.as_view(), name='hp_tracker_delete'),

    path('hp-tracker-update/<hp_tracker_uuid>',
         HpTrackerUpdate.as_view(), name='hp_tracker_update'),

    path('add-die-group/',
         DieGroupCreate.as_view(), name='die_group_create'),

    path('die-group-update/<die_group_uuid>',
         DieGroupUpdate.as_view(), name='die_group_update'),

    path('die-group-delete/<uuid>',
         DieGroupDelete.as_view(), name='die_group_delete'),

    path('die-standard-delete/<uuid>',
         DieStandardDelete.as_view(), name='die_standard_delete'),

    path('die-standard-create/<die_group_uuid>',
         DieStandardCreate.as_view(), name='die_standard_create'),

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

    path('game-timer-delete/<game_timer_uuid>',
         GameTimerDelete.as_view(), name='game_timer_delete'),

    path('game-timer-title-update/<game_timer_uuid>',
         GameTimerTitleUpdate.as_view(), name='game_timer_title_update'),

    path('game-timer-duration-update/<game_timer_uuid>',
         GameTimerDurationUpdate.as_view(), name='game_timer_duration_update'),

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

    path('draw-bag-create/',
         DrawBagCreate.as_view(), name='draw_bag_create'),

    path('draw-bag-delete/<draw_bag_uuid>',
         DrawBagDelete.as_view(), name='draw_bag_delete'),

    path('draw-bag-title-update/<draw_bag_uuid>',
         DrawBagUpdate.as_view(), name='draw_bag_title_update'),

    path('draw-bag-item-delete/<draw_bag_item_uuid>',
         DrawBagItemDelete.as_view(), name='draw_bag_item_delete'),

    path('draw-bag-draw-random-item/<draw_bag_uuid>',
         DrawBagDrawRandomItem.as_view(), name='draw_bag_draw_random_item'),

    path('draw-bag-item-return/<draw_bag_item_uuid>',
         DrawBagItemReturn.as_view(), name='draw_bag_item_return'),

    path('draw-bag-item-draw/<draw_bag_item_uuid>',
         DrawBagItemDraw.as_view(), name='draw_bag_item_draw'),

    path('draw-bag-reset/<draw_bag_uuid>',
         DrawBagReset.as_view(), name='draw_bag_reset'),

    path('draw-bag-item-create/<draw_bag_uuid>',
         DrawBagItemCreate.as_view(), name='draw_bag_item_create'),
]
