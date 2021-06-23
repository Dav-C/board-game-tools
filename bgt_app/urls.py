from django.urls import include, path
# import debug_toolbar
from .views import (
    CreateUser,
    DeleteUser,
    Login,
    Logout,
    UserHome,
    UserAccount,
    ToolSessionDetail,
    PlayerView,
    PlayerRandomizeOrder,
    HpTrackerView,
    DieGroupView,
    DieStandardView,
    RollDieGroup,
    RollDie,
    ResourceGroupView,
    ResourceView,
    GameTimerView,
    ScoringGroupView,
    ScoringGroupAddPlayers,
    ScoringCategoryView,
    DrawBagView,
    DrawBagItemView,
    DrawBagDrawRandomItem,
    DrawBagItemReturn,
    DrawBagItemDraw,
    DrawBagReset,
    PasswordReset,
    PasswordResetConfirm,
    PasswordResetDone,
    PasswordResetComplete,
    PasswordChange,
    PasswordChangeDone,
    ToolSessionUpdateDelete,
)

urlpatterns = [
    # path('__debug__/', include(debug_toolbar.urls)),
    path("create-user", CreateUser.as_view(), name="create_user"),
    path("delete_user", DeleteUser.as_view(), name="delete_user"),
    path("login", Login.as_view(), name="login"),
    path("password-reset", PasswordReset.as_view(), name="password_reset"),
    path("password-reset-done", PasswordResetDone.as_view(),
         name="password_reset_done"),
    path(
        "password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirm.as_view(),
        name="password_reset_confirm"
    ),
    path(
        "password-reset-complete", PasswordResetComplete.as_view(),
        name="password_reset_complete"
    ),
    path('password-change', PasswordChange.as_view(), name="password_change"),
    path('password-change-done', PasswordChangeDone.as_view(), name="password_change_done"),
    path("logout", Logout.as_view(), name="logout"),
    path("account", UserAccount.as_view(), name='user_account'),
    path("home", UserHome.as_view(), name="user_home"),
    path(
        "tool-session/<str:slug>/",
        ToolSessionDetail.as_view(),
        name="tool_session_detail",
    ),
    path("tool-session-update-delete/<tool_session_id>",
         ToolSessionUpdateDelete.as_view(),
         name="tool_session_update_delete"
         ),
    path("player-create/", PlayerView.as_view(), name="player_create"),
    path(
        "player-update-or-delete/<player_uuid>",
        PlayerView.as_view(),
        name="player_update_delete",
    ),
    path(
        "player-randomize-order/",
        PlayerRandomizeOrder.as_view(),
        name="player_randomize_order",
    ),
    path("hp-tracker-create/", HpTrackerView.as_view(), name="hp_tracker_create"),
    path(
        "hp-tracker-update-or-delete/<hp_tracker_uuid>",
        HpTrackerView.as_view(),
        name="hp_tracker_update_delete",
    ),
    path("die-group-create/", DieGroupView.as_view(), name="die_group_create"),
    path(
        "die-group-update-or-delete/<die_group_uuid>",
        DieGroupView.as_view(),
        name="die_group_update_delete",
    ),
    path(
        "die-standard-create/<die_group_uuid>",
        DieStandardView.as_view(),
        name="die_standard_create",
    ),
    path(
        "die-standard-delete/<die_standard_uuid>",
        DieStandardView.as_view(),
        name="die_standard_delete",
    ),
    path(
        "roll-die-group/<die_group_uuid>", RollDieGroup.as_view(), name="roll_die_group"
    ),
    path("roll-single-die/<die_uuid>", RollDie.as_view(), name="roll_die"),
    path(
        "resource-group-create/",
        ResourceGroupView.as_view(),
        name="resource_group_create",
    ),
    path(
        "resource-group-update-or-delete/<resource_group_uuid>",
        ResourceGroupView.as_view(),
        name="resource_group_update_delete",
    ),
    path(
        "resource-create/<resource_group_uuid>",
        ResourceView.as_view(),
        name="resource_create",
    ),
    path(
        "resource-update-or-delete/<resource_uuid>",
        ResourceView.as_view(),
        name="resource_update_delete",
    ),
    path("game-timer-create/", GameTimerView.as_view(), name="game_timer_create"),
    path(
        "game-timer-update-or-delete/<game_timer_uuid>",
        GameTimerView.as_view(),
        name="game_timer_update_delete",
    ),
    path(
        "scoring-group-create/", ScoringGroupView.as_view(), name="scoring_group_create"
    ),
    path(
        "scoring-group-update-delete/<scoring_group_uuid>",
        ScoringGroupView.as_view(),
        name="scoring_group_update_delete",
    ),
    path(
        "scoring-group-add-players/<scoring_group_uuid>",
        ScoringGroupAddPlayers.as_view(),
        name="scoring_group_add_players",
    ),
    path(
        "scoring-category-create/<scoring_group_uuid>",
        ScoringCategoryView.as_view(),
        name="scoring_category_create",
    ),
    path(
        "scoring-category-delete/<category_uuid>",
        ScoringCategoryView.as_view(),
        name="scoring_category_delete",
    ),
    path("draw-bag-create/", DrawBagView.as_view(), name="draw_bag_create"),
    path(
        "draw-bag-update-delete/<draw_bag_uuid>",
        DrawBagView.as_view(),
        name="draw_bag_update_delete",
    ),
    path(
        "draw-bag-item-create/<draw_bag_uuid>",
        DrawBagItemView.as_view(),
        name="draw_bag_item_create",
    ),
    path(
        "draw-bag-item-delete/<draw_bag_item_uuid>",
        DrawBagItemView.as_view(),
        name="draw_bag_item_delete",
    ),
    path(
        "draw-bag-draw-random-item/<draw_bag_uuid>",
        DrawBagDrawRandomItem.as_view(),
        name="draw_bag_draw_random_item",
    ),
    path(
        "draw-bag-item-return/<draw_bag_item_uuid>",
        DrawBagItemReturn.as_view(),
        name="draw_bag_item_return",
    ),
    path(
        "draw-bag-item-draw/<draw_bag_item_uuid>",
        DrawBagItemDraw.as_view(),
        name="draw_bag_item_draw",
    ),
    path(
        "draw-bag-reset/<draw_bag_uuid>", DrawBagReset.as_view(), name="draw_bag_reset"
    ),
]
