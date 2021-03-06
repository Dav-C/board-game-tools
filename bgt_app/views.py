from random import randint, choice, sample
from django.views.generic import (
    View,
    ListView,
    DetailView,
)
from django.db.models import Sum
from django.contrib.auth import login, authenticate
from django.contrib.auth.mixins import (
    LoginRequiredMixin,
)
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
    PasswordChangeView,
    PasswordChangeDoneView,
)
from django.shortcuts import (
    render,
    redirect,
    get_object_or_404,
)
from django.contrib import messages
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import FormMixin

from .forms import (
    CreateUserForm,
    ToolSessionForm,
    PlayerForm,
    HpTrackerForm,
    DieGroupForm,
    DieStandardForm,
    ResourceGroupForm,
    ResourceForm,
    GameTimerForm,
    ScoringGroupForm,
    ScoringGroupAddPlayersForm,
    ScoringCategoryForm,
    DrawBagForm,
    DrawBagItemForm,
)

from .models import (
    Player,
    ScoringGroup,
    ScoringCategory,
    ResourceGroup,
    Resource,
    DieGroup,
    DieStandard,
    HpTracker,
    ToolSession,
    UserProfile,
    GameTimer,
    DrawBag,
    DrawBagItem,
)


def save_new_tool_and_associate_with_session(form, request):
    """This function is used inside other views for saving new models via
    ajax requests. The active tool session is associated with the new object."""

    form = form(request.POST)
    if form.is_valid():
        form_instance = form.save()
        # add foreign key for the tool session the new object should
        # be linked to and save
        form_instance.tool_session = ToolSession.objects.get(
            # this is set in the get method of ToolSessionDetail
            id=request.session["active_tool_session_id"]
        )
        form_instance.save()
        serialized_form_instance = serializers.serialize(
            "json",
            [
                form_instance,
            ],
        )
        return JsonResponse({"form_instance": serialized_form_instance}, status=200)
    else:
        return JsonResponse({"error": form.errors.as_json()}, status=400)


def object_count(request, model):
    """count tools to determine if the maximum has been reached before
    creating additional tools"""
    active_tool_session_id = request.session["active_tool_session_id"]
    num_of_objects = model.objects.filter(
        tool_session_id=active_tool_session_id
    ).count()
    return num_of_objects


def group_nested_object_count(request, model, group_uuid):
    """count objects linked via foreign keys to tools to determine if the
    maximum has been reached before creating more objects"""
    num_of_objects = model.objects.filter(group_id=group_uuid).count()
    return num_of_objects


def create_or_update_obj_and_serialize(request, form, model, obj_uuid, group_model):
    """attempt to update and object and serialize the result, if the object
    does not exist, create it"""
    try:
        object_to_save = model.objects.get(id=obj_uuid)
        form = form(request.PUT, instance=object_to_save)
        # print(request.PUT)
        update_existing_object = True
    except model.DoesNotExist:
        form = form(request.POST)
        update_existing_object = False

    if update_existing_object:
        if form.is_valid():
            form_instance = form.save()
            serialized_form_instance = serializers.serialize(
                "json",
                [
                    form_instance,
                ],
            )
            return JsonResponse({"form_instance": serialized_form_instance}, status=200)
        else:
            return JsonResponse({"error": form.errors.as_json()}, status=400)
    else:
        if form.is_valid():
            form_instance = form.save(commit=False)
            form_instance.group = group_model.objects.get(id=obj_uuid)
            form_instance.save()
            serialized_form_instance = serializers.serialize(
                "json",
                [
                    form_instance,
                ],
            )
            return JsonResponse({"form_instance": serialized_form_instance}, status=200)
        else:
            return JsonResponse({"error": form.errors.as_json()}, status=400)


def delete_object(request, model, uuid):
    object_to_delete = get_object_or_404(model, id=uuid)
    if object_to_delete.tool_session.session_owner.user.id == request.user.id:
        object_to_delete.delete()
        return JsonResponse({"message": "successfully deleted"}, status=200)
    else:
        messages.error(request, "Insufficient Permission")
    return redirect("user_home")


class CreateUser(View):
    """create a new user (accounts).  When a new user is created it is
    immediately associated with a UserProfile"""

    def get(self, request):
        context = {"create_user_form": CreateUserForm}
        return render(request, "bgt_app/create_user.html", context)

    def post(self, request):
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password1")
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect("user_home")
        else:
            return render(
                request, "bgt_app/create_user.html", {"create_user_form": form}
            )


class DeleteUser(View):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            user.delete()
            messages.info(request, "Your account has been deleted.")
            return redirect("login")
        else:
            messages.error(request, "Insufficient Permission")
        return redirect("login")


class PasswordReset(PasswordResetView):
    """reset a user's password"""

    template_name = "bgt_app/reset_password.html"
    html_email_template_name = "bgt_app/password_reset_request.html"
    subject_template_name = "bgt_app/password_reset_subject_line.txt"


class PasswordResetDone(PasswordResetDoneView):
    """confirm a user's email is valid and send a reset link"""

    template_name = "bgt_app/reset_password_done.html"


class PasswordResetConfirm(PasswordResetConfirmView):
    """allow a user to input new passwords after following
    the reset link which was emailed"""

    template_name = "bgt_app/reset_password_confirm.html"


class PasswordResetComplete(PasswordResetCompleteView):
    """shown after a password reset attempt (successful or not)"""

    template_name = "bgt_app/reset_password_complete.html"


class PasswordChange(PasswordChangeView):
    """allow a user to change their password"""

    template_name = "bgt_app/password_change.html"


class PasswordChangeDone(PasswordChangeDoneView):
    """displayed after a user changes their password"""

    template_name = "bgt_app/password_change_complete.html"


class Login(LoginView):
    """log a user into the app"""

    template_name = "bgt_app/login.html"


class Logout(LogoutView):
    """log a user out of the app"""

    next_page = "login"

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        messages.add_message(request, messages.INFO, "Successfully logged out.")
        return response


class UserAccount(LoginRequiredMixin, View):
    """update or delete a user's account"""

    def get(self, request):
        return render(request, "bgt_app/user_account.html")


class UserHome(LoginRequiredMixin, FormMixin, ListView):
    """render a list of existing tool sessions and allow the user
    to create more."""

    form_class = ToolSessionForm
    template_name = "bgt_app/user_home.html"

    def post(self, request, *args, **kwargs):
        user = request.user
        tool_sessions = ToolSession.objects.filter(session_owner_id=user.id)
        total_sessions = tool_sessions.count()
        # users are limited to 10 sessions per account
        if total_sessions <= 9:
            form = self.get_form()
            if form.is_valid():
                tool_session = form.save(commit=False)
                tool_session.session_owner = UserProfile.objects.get(
                    user_id=self.request.user.id
                )
                form.save()
                return redirect("user_home")
            else:
                return redirect("user_home")
        else:
            messages.info(request, "10 session maximum has been reached")
            return redirect("user_home")

    def get_queryset(self, **kwargs):
        logged_in_user_profile = UserProfile.objects.get(user_id=self.request.user.id)
        self.queryset = ToolSession.objects.filter(
            session_owner=logged_in_user_profile
        ).order_by("-creation_date")
        return self.queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ToolSessionUpdateDelete(LoginRequiredMixin, View):
    """update the title of a tool session or delete it"""

    def put(self, request, tool_session_id):
        tool_session = ToolSession.objects.get(id=tool_session_id)
        form = ToolSessionForm(request.PUT, instance=tool_session)
        if form.is_valid:
            form_instance = form.save()
            serialized_form_instance = serializers.serialize(
                "json",
                [
                    form_instance,
                ],
            )
            return JsonResponse({"form_instance": serialized_form_instance}, status=200)
        else:
            return JsonResponse({"error": form.errors.as_json()}, status=400)

    def delete(self, request, tool_session_id):
        tool_session = ToolSession.objects.get(id=tool_session_id)
        if request.user.id == tool_session.session_owner.id:
            tool_session.delete()
            messages.success(request, "Session Deleted")
            return redirect("user_home")
        else:
            messages.error(request, "Insufficient Permission")
            return redirect("user_home")


class ToolSessionDetail(LoginRequiredMixin, DetailView):
    """This is the main tool session view, all tools are loaded here as well as
    the menu for creating tools and switching between them"""

    template_name = "bgt_app/tool_session_detail.html"

    def get_queryset(self, **kwargs):
        logged_in_user_profile = UserProfile.objects.get(user_id=self.request.user.id)
        self.queryset = ToolSession.objects.filter(session_owner=logged_in_user_profile)
        return self.queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # put the active tool session id into a session value to be used for
        # assigning new objects to the right tool session other views
        self.request.session["active_tool_session_id"] = str(self.object.id)
        active_tool_session_id = self.request.session["active_tool_session_id"]
        players = Player.objects.filter(
            tool_session_id=active_tool_session_id
        ).order_by("player_order")
        hp_trackers = self.object.hp_tracker.all()
        die_groups = DieGroup.objects.filter(
            tool_session_id=active_tool_session_id
        ).annotate(group_dice_sum=Sum("standard_dice__rolled_value"))
        resource_groups = ResourceGroup.objects.filter(
            tool_session_id=active_tool_session_id
        )
        game_timers = GameTimer.objects.filter(tool_session_id=active_tool_session_id)
        scoring_groups = ScoringGroup.objects.filter(
            tool_session_id=active_tool_session_id
        )

        draw_bags = DrawBag.objects.filter(tool_session_id=active_tool_session_id)

        draw_bag_items_sorted_by_name = DrawBagItem.objects.filter(
            group__tool_session_id=active_tool_session_id
        ).order_by("name")

        scoring_group_initial_player_checks_box_values = []
        for group in scoring_groups:
            for player in players:
                if player in group.players.all():
                    scoring_group_initial_player_checks_box_values.append(player)

        context["tool_session"] = ToolSession.objects.get(id=active_tool_session_id)
        context["tool_session_form"] = ToolSessionForm
        context["players"] = players
        context["player_form"] = PlayerForm
        context["hp_trackers"] = hp_trackers
        context["hp_tracker_form"] = HpTrackerForm
        context["die_groups"] = die_groups
        context["die_group_form"] = DieGroupForm
        context["die_standard_form"] = DieStandardForm
        context["resource_groups"] = resource_groups
        context["resource_group_form"] = ResourceGroupForm
        context["resource_form"] = ResourceForm
        context["game_timers"] = game_timers
        context["game_timer_form"] = GameTimerForm
        context["scoring_group_form"] = ScoringGroupForm
        context["scoring_groups"] = scoring_groups
        context["scoring_group_add_players_form"] = ScoringGroupAddPlayersForm(
            active_tool_session_id=active_tool_session_id,
            initial={"players": scoring_group_initial_player_checks_box_values},
        )
        context["scoring_category_form"] = ScoringCategoryForm
        context["draw_bags"] = draw_bags
        context["draw_bag_items_sorted_by_name"] = draw_bag_items_sorted_by_name
        context["draw_bag_form"] = DrawBagForm
        context["draw_bag_item_form"] = DrawBagItemForm

        return context


class PlayerView(LoginRequiredMixin, View):
    """create, update and delete players"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, Player) <= 14:
            return save_new_tool_and_associate_with_session(
                form=PlayerForm,
                request=self.request,
            )
        else:
            return JsonResponse({"error": "maximum 15 players per session"}, status=401)

    def put(self, request, player_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=PlayerForm,
            model=Player,
            obj_uuid=player_uuid,
            group_model=None,
        )

    def delete(self, request, player_uuid):
        return delete_object(request=self.request, model=Player, uuid=player_uuid)


class PlayerRandomizeOrder(LoginRequiredMixin, View):
    """Randomize the values stored in the Player.player_order fields
    based on the number of players there are playing the game"""

    def get(self, request):
        active_tool_session_id = self.request.session["active_tool_session_id"]
        players = Player.objects.filter(tool_session_id=active_tool_session_id)
        player_count = players.count()
        order_list = [*range(1, player_count + 1)]
        for player in players:
            player_order = choice(order_list)
            order_list.remove(player_order)
            player.player_order = player_order
            player.save()

        return JsonResponse({"message": "player order randomized"}, status=200)


class HpTrackerView(LoginRequiredMixin, View):
    """create update and delete HpTrackers"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, HpTracker) <= 14:
            return save_new_tool_and_associate_with_session(
                form=HpTrackerForm,
                request=self.request,
            )
        else:
            return JsonResponse(
                {"error": "maximum 15 hp trackers per session"}, status=401
            )

    def put(self, request, hp_tracker_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=HpTrackerForm,
            model=HpTracker,
            obj_uuid=hp_tracker_uuid,
            group_model=None,
        )

    def delete(self, request, hp_tracker_uuid):
        return delete_object(
            request=self.request, model=HpTracker, uuid=hp_tracker_uuid
        )


class DieGroupView(LoginRequiredMixin, View):
    """create, update and delete DieGroup objects"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, DieGroup) <= 9:
            return save_new_tool_and_associate_with_session(
                form=DieGroupForm, request=self.request
            )
        else:
            return JsonResponse(
                {"error": "maximum 10 die collections per session"}, status=401
            )

    def put(self, request, die_group_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=DieGroupForm,
            model=DieGroup,
            obj_uuid=die_group_uuid,
            group_model=None,
        )

    def delete(self, request, die_group_uuid):
        return delete_object(request=self.request, model=DieGroup, uuid=die_group_uuid)


class DieStandardView(LoginRequiredMixin, View):
    """create and delete DieStandard objects"""

    def post(self, request, die_group_uuid, *args, **kwargs):
        if (
            group_nested_object_count(
                request=self.request, model=DieStandard, group_uuid=die_group_uuid
            )
            <= 19
        ):
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=DieStandardForm,
                model=DieStandard,
                obj_uuid=die_group_uuid,
                group_model=DieGroup,
            )
        else:
            return JsonResponse(
                {"error": "maximum 20 dice per die collection"}, status=401
            )

    def delete(self, request, die_standard_uuid):
        die_to_delete = get_object_or_404(DieStandard, id=die_standard_uuid)
        if die_to_delete.group.tool_session.session_owner.user.id == request.user.id:
            die_to_delete.delete()
            return JsonResponse({"message": "die deleted"}, status=200)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect("user_home")


class RollDieGroup(LoginRequiredMixin, View):
    """Randomize all the die values in a die group"""

    def get(self, request, die_group_uuid):
        die_group_dice = DieStandard.objects.filter(group_id=die_group_uuid)
        for die in die_group_dice:
            die.rolled_value = randint(1, int(die.num_sides))
            die.save()
        return JsonResponse({"message": "dice rolled!"}, status=200)


class RollDie(LoginRequiredMixin, View):
    """Randomize the value for 1 die, selected by the user"""

    def get(self, request, die_uuid):
        die = DieStandard.objects.get(id=die_uuid)
        die.rolled_value = randint(1, int(die.num_sides))
        die.save()
        return JsonResponse({"message": "die rolled!"}, status=200)


class ResourceGroupView(LoginRequiredMixin, View):
    """create, update and delete ResourceGroup objects"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, ResourceGroup) <= 9:
            return save_new_tool_and_associate_with_session(
                form=ResourceGroupForm, request=self.request
            )
        else:
            return JsonResponse(
                {"error": "maximum 10 resource groups per session"}, status=401
            )

    def put(self, request, resource_group_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceGroupForm,
            model=ResourceGroup,
            obj_uuid=resource_group_uuid,
            group_model=None,
        )

    def delete(self, request, resource_group_uuid):
        return delete_object(
            request=self.request, model=ResourceGroup, uuid=resource_group_uuid
        )


class ResourceView(LoginRequiredMixin, View):
    """create, update and delete Resource objects"""

    def post(self, request, resource_group_uuid, *args, **kwargs):
        if (
            group_nested_object_count(
                request=self.request, model=Resource, group_uuid=resource_group_uuid
            )
            <= 19
        ):
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=ResourceForm,
                model=Resource,
                obj_uuid=resource_group_uuid,
                group_model=ResourceGroup,
            )
        else:
            return JsonResponse(
                {"error": "maximum 20 resource types per resource group"}, status=401
            )

    def put(self, request, resource_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceForm,
            model=Resource,
            obj_uuid=resource_uuid,
            group_model=ResourceGroup,
        )

    def delete(self, request, resource_uuid):
        resource_to_delete = get_object_or_404(Resource, id=resource_uuid)
        if (
            resource_to_delete.group.tool_session.session_owner.user.id
            == request.user.id
        ):
            resource_to_delete.delete()
            return JsonResponse({"message": "successfully deleted"}, status=200)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect("user_home")


class GameTimerView(LoginRequiredMixin, View):
    """Create a GameTimer Object"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, GameTimer) == 0:
            return save_new_tool_and_associate_with_session(
                form=GameTimerForm, request=self.request
            )
        else:
            return JsonResponse(
                {"error": "only 1 timer per session is supported"}, status=401
            )

    def put(self, request, game_timer_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=GameTimerForm,
            model=GameTimer,
            obj_uuid=game_timer_uuid,
            group_model=None,
        )

    def delete(self, request, game_timer_uuid):
        return delete_object(
            request=self.request, model=GameTimer, uuid=game_timer_uuid
        )


class ScoringGroupView(LoginRequiredMixin, View):
    """create, updated and delete scoring groups"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, ScoringGroup) == 0:
            return save_new_tool_and_associate_with_session(
                form=ScoringGroupForm, request=self.request
            )
        else:
            return JsonResponse(
                {"error": "only 1 scoring calculator per session is supported"},
                status=401,
            )

    def put(self, request, scoring_group_uuid, *args, **kwargs):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ScoringGroupForm,
            model=ScoringGroup,
            obj_uuid=scoring_group_uuid,
            group_model=None,
        )

    def delete(self, request, scoring_group_uuid):
        return delete_object(
            request=self.request, model=ScoringGroup, uuid=scoring_group_uuid
        )


class ScoringGroupAddPlayers(LoginRequiredMixin, View):
    """associate selected Players with a ScoringGroup Object"""

    def post(self, request, scoring_group_uuid, *args, **kwargs):
        form = ScoringGroupAddPlayersForm(
            request.POST,
            active_tool_session_id=self.request.session["active_tool_session_id"],
            instance=ScoringGroup.objects.get(id=scoring_group_uuid),
        )
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "saved"}, status=200)
        else:
            return JsonResponse({"error": form.errors.as_json()}, status=400)


class ScoringCategoryView(LoginRequiredMixin, View):
    """create and delete scoring categories"""

    def post(self, request, scoring_group_uuid, *args, **kwargs):
        if (
            group_nested_object_count(
                request=self.request,
                model=ScoringCategory,
                group_uuid=scoring_group_uuid,
            )
            <= 19
        ):
            # erase player scores
            active_tool_session_id = self.request.session["active_tool_session_id"]
            players = Player.objects.filter(tool_session_id=active_tool_session_id)
            for player in players:
                player.score = None
                player.save()
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=ScoringCategoryForm,
                model=ScoringCategory,
                obj_uuid=scoring_group_uuid,
                group_model=ScoringGroup,
            )
        else:
            return JsonResponse(
                {"error": "maximum 20 scoring categories per scoring calculator"},
                status=401,
            )

    def delete(self, request, category_uuid):
        category_to_delete = get_object_or_404(ScoringCategory, id=category_uuid)
        if (
            category_to_delete.group.tool_session.session_owner.user.id
            == request.user.id
        ):
            category_to_delete.delete()
            # erase player scores
            active_tool_session_id = self.request.session["active_tool_session_id"]
            players = Player.objects.filter(tool_session_id=active_tool_session_id)
            for player in players:
                player.score = None
                player.save()
            return JsonResponse({"message": "successfully deleted"}, status=200)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect("user_home")


class DrawBagView(LoginRequiredMixin, View):
    """create update and delete DrawBag objects"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, DrawBag) <= 5:
            return save_new_tool_and_associate_with_session(
                form=DrawBagForm, request=self.request
            )
        else:
            return JsonResponse(
                {"error": "maximum 5 draw bags per session"}, status=401
            )

    def put(self, request, draw_bag_uuid, *args, **kwargs):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=DrawBagForm,
            model=DrawBag,
            obj_uuid=draw_bag_uuid,
            group_model=DrawBag,
        )

    def delete(self, request, draw_bag_uuid):
        return delete_object(request=self.request, model=DrawBag, uuid=draw_bag_uuid)


class DrawBagItemView(LoginRequiredMixin, View):
    """create and delete DrawBagItem Objects"""

    def post(self, request, draw_bag_uuid):
        form = DrawBagItemForm(request.POST, request.FILES)
        if form.is_valid():
            form_instance = form.save(commit=False)
            form_instance.group = DrawBag.objects.get(id=draw_bag_uuid)
            form_instance.save()
            serialized_form_instance = serializers.serialize(
                "json",
                [
                    form_instance,
                ],
            )
            return JsonResponse({"form_instance": serialized_form_instance}, status=200)
        else:
            return JsonResponse({"error": form.errors.as_json()}, status=400)

    def delete(self, request, draw_bag_item_uuid):
        draw_bag_item_to_delete = get_object_or_404(DrawBagItem, id=draw_bag_item_uuid)
        if (
            draw_bag_item_to_delete.group.tool_session.session_owner.user.id
            == request.user.id
        ):
            draw_bag_item_to_delete.delete()
            return JsonResponse({"message": "item deleted"}, status=200)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect("user_home")


class DrawBagDrawRandomItem(LoginRequiredMixin, View):
    """Draw a random item from a DrawBag"""

    def get(self, request, draw_bag_uuid):
        draw_bag_items = list(
            DrawBagItem.objects.filter(group__id=draw_bag_uuid, drawn=False)
        )
        if draw_bag_items:
            try:
                random_selection = sample(draw_bag_items, 1).pop(0)
                random_selection.drawn = True
                random_selection.save()
                serialized_item = serializers.serialize("json", [random_selection])
                return JsonResponse({"item": serialized_item}, status=200)
            except ValueError:
                return JsonResponse(
                    {"error": "there was a problem drawing an item"}, status=500
                )
        else:
            return JsonResponse({"message": "the bag is empty!"}, status=200)


class DrawBagItemReturn(LoginRequiredMixin, View):
    """Return a specific DrawBagItem to a draw bag"""

    def get(self, request, draw_bag_item_uuid):
        try:
            draw_bag_item = DrawBagItem.objects.get(id=draw_bag_item_uuid)
            draw_bag_item.drawn = False
            draw_bag_item.save()
            return JsonResponse({"message": "item returned to the bag"}, status=200)
        except DrawBagItem.DoesNotExist:
            return JsonResponse({"error": "that item does not exist"}, status=404)


class DrawBagItemDraw(LoginRequiredMixin, View):
    """draw a specific DrawBagItem from a draw bag"""

    def get(self, request, draw_bag_item_uuid):
        try:
            draw_bag_item = DrawBagItem.objects.get(id=draw_bag_item_uuid)
            draw_bag_item.drawn = True
            draw_bag_item.save()
            return JsonResponse({"message": "item removed from the bag"}, status=200)
        except DrawBagItem.DoesNotExist:
            return JsonResponse({"error": "that item does not exist"}, status=404)


class DrawBagReset(LoginRequiredMixin, View):
    """Put all the DrawBagItems back in the bag"""

    def get(self, request, draw_bag_uuid):
        draw_bag_items = DrawBagItem.objects.filter(group__id=draw_bag_uuid, drawn=True)
        if draw_bag_items:
            for draw_bag_item in draw_bag_items:
                draw_bag_item.drawn = False
                draw_bag_item.save()
            return JsonResponse({"message": "draw bag reset"}, status=200)
        else:
            return JsonResponse({"message": "nothing to put in the bag"}, status=200)
