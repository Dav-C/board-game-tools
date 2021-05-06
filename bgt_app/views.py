from random import randint, choice
import json
import rapidjson
from django.conf import settings
from django.views.generic import (
    View,
    ListView,
    CreateView,
    DetailView,
    UpdateView,
    DeleteView
)
from django.db.models import Sum
from django.contrib.auth import login, authenticate
from django.contrib.auth.mixins import (
    LoginRequiredMixin,
    PermissionRequiredMixin,
)
from django.utils.http import is_safe_url
from django.shortcuts import (
    render,
    redirect,
    reverse,
    get_object_or_404,
    HttpResponseRedirect
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
    PlayerScoreForm,
    HpTrackerCreateForm,
    HpTrackerChangeValueForm,
    DieGroupForm,
    DieGroupUpdateForm,
    DieStandardForm,
    ResourceGroupForm,
    ResourceCreateForm,
    ResourceNameChangeForm,
    ResourceQuantityChangeForm,
    ResourceProductionModifierChangeForm,
    GameTimerCreateForm,
    GameTimerDurationUpdateForm,
    ScoringGroupForm,
    ScoringGroupAddPlayersForm,
    ScoringCategoryCreateForm,
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
    GameTimer
)


class CreateUser(View):
    def get(self, request):
        context = {'create_user_form': CreateUserForm}
        return render(request, 'bgt_app/create_user.html', context)

    def post(self, request):
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('user_home')
        else:
            return render(request, 'bgt_app/create_user.html',
                          {'create_user_form': form})


class Login(LoginView):
    template_name = "bgt_app/login.html"


class Logout(LogoutView):
    next_page = "login"

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        messages.add_message(request, messages.INFO, "Successfully logged out.")
        return response


class UserHome(LoginRequiredMixin, FormMixin, ListView):
    form_class = ToolSessionForm
    template_name = 'bgt_app/user_home.html'

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            tool_session = form.save(commit=False)
            tool_session.session_owner = \
                UserProfile.objects.get(user_id=self.request.user.id)
            form.save()
            return redirect('user_home')
        else:
            return redirect('user_home')

    def get_queryset(self, **kwargs):
        logged_in_user_profile = UserProfile.objects.get(
            user_id=self.request.user.id)
        self.queryset = (
            ToolSession.objects
            .filter(session_owner=logged_in_user_profile)
            .order_by('-creation_date')
        )
        return self.queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ToolSessionDetail(LoginRequiredMixin, DetailView):
    template_name = 'bgt_app/tool_session_detail.html'

    def get_queryset(self, **kwargs):
        logged_in_user_profile = UserProfile.objects.get(
            user_id=self.request.user.id)
        self.queryset = ToolSession.objects.filter(
            session_owner=logged_in_user_profile)
        return self.queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # put the active tool session id into a session value to be used for
        # assigning new objects to the right tool session other views
        self.request.session['active_tool_session_id'] = str(self.object.id)
        active_tool_session_id = self.request.session['active_tool_session_id']
        players = Player.objects\
            .filter(tool_session_id=active_tool_session_id)\
            .order_by('player_order')
        hp_trackers = self.object.hp_tracker.all()
        die_groups = DieGroup.objects\
            .filter(
                tool_session_id=active_tool_session_id
            ).annotate(
                group_dice_sum=Sum('standard_dice__rolled_value')
            )
        resource_groups = ResourceGroup.objects\
            .filter(
                tool_session_id=active_tool_session_id
            )
        game_timers = GameTimer.objects\
            .filter(
                tool_session_id=active_tool_session_id
            )
        scoring_groups = ScoringGroup.objects\
            .filter(
                tool_session_id=active_tool_session_id
            )

        scoring_group_initial_player_checks_box_values = []
        for group in scoring_groups:
            for player in players:
                if player in group.players.all():
                    print(player.name)
                    scoring_group_initial_player_checks_box_values.append(player)

        context['players'] = players
        context['player_form'] = PlayerForm
        context['player_score_form'] = PlayerScoreForm
        context['hp_tracker_create_form'] = HpTrackerCreateForm
        context['hp_change_value_form'] = HpTrackerChangeValueForm
        context['hp_trackers'] = hp_trackers
        context['die_group_form'] = DieGroupForm
        context['die_group_update_form'] = DieGroupUpdateForm
        context['die_groups'] = die_groups
        context['die_standard_form'] = DieStandardForm
        context['resource_group_form'] = ResourceGroupForm
        context['resource_groups'] = resource_groups
        context['resource_create_form'] = ResourceCreateForm
        context['resource_name_change_form'] = ResourceNameChangeForm
        context['resource_qty_change_form'] = ResourceQuantityChangeForm
        context['resource_production_modifier_change_form'] = \
            ResourceProductionModifierChangeForm
        context['game_timer_create_form'] = GameTimerCreateForm
        context['game_timer_duration_update_form'] = GameTimerDurationUpdateForm
        context['game_timers'] = game_timers
        context['scoring_group_form'] = ScoringGroupForm
        context['scoring_group_add_players_form'] = \
            ScoringGroupAddPlayersForm(
                active_tool_session_id=active_tool_session_id,
                initial={
                    'players': scoring_group_initial_player_checks_box_values
                         })
        context['scoring_groups'] = scoring_groups
        context['scoring_category_create_form'] = \
            ScoringCategoryCreateForm

        return context


def save_new_tool_and_associate_with_session(form, request):
    """This function is used inside other views for saving new models via
    ajax requests. The active tool session is associated with the new object."""

    form = form(request.POST)
    if form.is_valid():
        form_instance = form.save()
        # add foreign key for the tool session the new object should
        # be linked to and save
        form_instance.tool_session = \
            ToolSession.objects.get(
                # this is set in the get method of ToolSessionDetail
                id=request.session['active_tool_session_id']
            )
        form_instance.save()
        serialized_form_instance = serializers.serialize(
            'json', [form_instance, ])
        return JsonResponse(
            {'form_instance': serialized_form_instance}, status=200)
    else:
        return JsonResponse({'error': form.errors.as_json()}, status=400)


def object_count(request, model):
    active_tool_session_id = request.session['active_tool_session_id']
    num_of_objects = model.objects\
        .filter(tool_session_id=active_tool_session_id).count()
    return num_of_objects


def group_nested_object_count(request, model, group_uuid):
    active_tool_session_id = request.session['active_tool_session_id']
    num_of_objects = model.objects\
        .filter(group_id=group_uuid).count()
    return num_of_objects


def create_or_update_obj_and_serialize(
        request, form, model, obj_uuid, group_model):
    update_existing_object = False
    try:
        object_to_save = model.objects.get(id=obj_uuid)
        form = form(
            request.POST or None, instance=object_to_save
        )
        update_existing_object = True
    except model.DoesNotExist:
        form = form(request.POST)
        update_existing_object = False

    if update_existing_object:
        if form.is_valid():
            form_instance = form.save()
            serialized_form_instance = serializers.serialize(
                'json', [form_instance, ])
            return JsonResponse(
                {'form_instance': serialized_form_instance}, status=200)
        else:
            return JsonResponse({'error': form.errors.as_json()}, status=400)
    else:
        if form.is_valid():
            form_instance = form.save(commit=False)
            form_instance.group = \
                group_model.objects.get(
                    id=obj_uuid
                )
            form_instance.save()
            serialized_form_instance = serializers.serialize(
                'json', [form_instance, ])
            return JsonResponse(
                {'form_instance': serialized_form_instance}, status=200)
        else:
            return JsonResponse({'error': form.errors.as_json()}, status=400)


def reload_current_url(request):
    """this is used as a return on some views to safely reload the page after
    completing a GET or POST, (after deleting an object for example)"""

    redirect_url = request.GET.get('next')
    url_is_safe = is_safe_url(
        url=redirect_url,
        allowed_hosts=settings.ALLOWED_HOSTS,
        require_https=request.is_secure(),
    )
    if url_is_safe and redirect_url:
        return redirect(redirect_url)
    else:
        return redirect('user_home')


def delete_model_object(request, model, uuid):
    """delete a model object and reload the page.  This is used to remove
    tools from their respective pages"""
    object_to_delete = get_object_or_404(model, id=uuid)
    if object_to_delete.tool_session.session_owner.user.id == request.user.id:
        object_to_delete.delete()
        return reload_current_url(request)
    else:
        messages.error(request, "Insufficient Permission")
    return redirect('user_home')


class PlayerCreate(LoginRequiredMixin, View):
    """create a Player object and associate it with the active tool session
    that the current user has open, post is ajax"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, Player) <= 14:
            return save_new_tool_and_associate_with_session(
                form=PlayerForm,
                request=self.request,
            )
        else:
            return JsonResponse({
                'error': "maximum 15 players per session"
            }, status=401)


class PlayerDelete(LoginRequiredMixin, View):
    """delete a Player object"""

    def post(self, request, player_uuid):
        player_to_delete = get_object_or_404(Player, id=player_uuid)
        if player_to_delete.tool_session.session_owner.user.id == request.user.id:
            player_to_delete.delete()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect('user_home')


class PlayerRandomizeOrder(LoginRequiredMixin, View):
    """Randomize the values stored in the Player.player_order fields
    based on the number of players there are playing the game"""
    def get(self, request):
        active_tool_session_id = self.request.session['active_tool_session_id']
        players = Player.objects\
            .filter(tool_session_id=active_tool_session_id)
        player_count = players.count()
        order_list = [*range(1, player_count+1)]
        for player in players:
            player_order = choice(order_list)
            order_list.remove(player_order)
            player.player_order = player_order
            player.save()

        return reload_current_url(request)


class HpTrackerCreate(LoginRequiredMixin, View):
    """Add an HpTracker to the database and associate it
    with the active tool session that the current user has open, post is ajax"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, HpTracker) <= 14:
            return save_new_tool_and_associate_with_session(
                form=HpTrackerCreateForm,
                request=self.request,
            )
        else:
            return JsonResponse({
                'error': "maximum 15 hp trackers per session"
            }, status=401)


class HpTrackerUpdate(LoginRequiredMixin, View):
    """Change an HpTracker hp_value and/or title"""

    def post(self, request, hp_tracker_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=HpTrackerChangeValueForm,
            model=HpTracker,
            obj_uuid=hp_tracker_uuid,
            group_model=None,
        )


class HpTrackerDelete(LoginRequiredMixin, View):
    """Delete an HpTracker Object"""

    def post(self, request, uuid):
        return delete_model_object(
            request=self.request, model=HpTracker, uuid=uuid
        )


class DieGroupCreate(LoginRequiredMixin, View):
    """Add a DieGroup object to the database and associate it with the active
    tool session that the current user has open, post is ajax
    Die Groups hold sets of dice so they can more easily be separated for
    gameplay purposes and processed (rolled) as a group."""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, DieGroup) <= 9:
            return save_new_tool_and_associate_with_session(
                form=DieGroupForm,
                request=self.request
            )
        else:
            return JsonResponse({
                'error': "maximum 10 die collections per session"
            }, status=401)


class DieGroupUpdate(LoginRequiredMixin, View):
    """Change a DieGroup title"""

    def post(self, request, die_group_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=DieGroupUpdateForm,
            model=DieGroup,
            obj_uuid=die_group_uuid,
            group_model=None,
        )


class DieGroupDelete(LoginRequiredMixin, View):
    """Delete a DieGroup Object"""

    def post(self, request, uuid):
        return delete_model_object(
            request=self.request, model=DieGroup, uuid=uuid
        )


class DieStandardDelete(LoginRequiredMixin, View):
    """Delete a DieStandard Object"""

    def post(self, request, uuid):
        die_to_delete = get_object_or_404(DieStandard, id=uuid)
        if die_to_delete.group.tool_session.session_owner.user.id == request.user.id:
            die_to_delete.delete()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect('user_home')


class DieStandardCreate(LoginRequiredMixin, View):
    """Add a DieStandard object and associate it with the group that invoked the
    add request"""

    def post(self, request, die_group_uuid, *args, **kwargs):
        if group_nested_object_count(
                request=self.request,
                model=DieStandard,
                group_uuid=die_group_uuid) <= 19:
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=DieStandardForm,
                model=DieStandard,
                obj_uuid=die_group_uuid,
                group_model=DieGroup,
            )
        else:
            return JsonResponse({
                'error': "maximum 20 dice per die collection"
            }, status=401)


class RollDieGroup(LoginRequiredMixin, View):
    """Randomize all the die values in a die group"""
    def get(self, request, die_group_uuid):
        die_group_dice = DieStandard.objects.filter(group_id=die_group_uuid)
        for die in die_group_dice:
            die.rolled_value = randint(2, int(die.num_sides))
            die.save()

        # this is used to calculate the sum of the die group and is passed in
        # the response.
        die_groups = DieGroup.objects\
            .filter(
                tool_session_id=self.request.session['active_tool_session_id'],
                id=die_group_uuid)\
            .annotate(group_dice_sum=Sum('standard_dice__rolled_value')).values()

        serialized_dice_values = serializers.serialize(
            'json', list(die_group_dice), fields=('rolled_value', 'id'))
        serialized_die_group_sum =\
            rapidjson.dumps(list(die_groups),  uuid_mode=rapidjson.UM_CANONICAL)
        return JsonResponse({
            'die_group_dice': serialized_dice_values,
            'die_group_sum': serialized_die_group_sum,
                            }, status=200)


class RollDie(LoginRequiredMixin, View):
    """Randomize the value for 1 die, selected by the user"""
    def get(self, request, die_uuid):
        die = DieStandard.objects.get(id=die_uuid)
        die.rolled_value = randint(2, int(die.num_sides))
        die.save()

        die_group = DieGroup.objects\
            .filter(
                tool_session_id=self.request.session['active_tool_session_id'],
                id=die.group_id)\
            .annotate(group_dice_sum=Sum('standard_dice__rolled_value')).values()

        serialized_die_value = serializers.serialize(
            'json', [die]
        )
        serialized_die_group_sum =\
            rapidjson.dumps(list(die_group),  uuid_mode=rapidjson.UM_CANONICAL)
        return JsonResponse({
            'rolled_die_value': serialized_die_value,
            'die_group_sum': serialized_die_group_sum,
                            }, status=200)


class ResourceGroupCreate(LoginRequiredMixin, View):
    """Add a ResourceGroup to the database and associate it with the active tool
    session that the current user has open, post is ajax
    Resource Groups hold sets of resources"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, ResourceGroup) <= 9:
            return save_new_tool_and_associate_with_session(
                form=ResourceGroupForm,
                request=self.request
            )
        else:
            return JsonResponse({
                'error': "maximum 10 resource groups per session"
            }, status=401)


class ResourceGroupUpdate(LoginRequiredMixin, View):
    """Change a ResourceGroup title"""

    def post(self, request, resource_group_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceGroupForm,
            model=ResourceGroup,
            obj_uuid=resource_group_uuid,
            group_model=None,
        )


class ResourceGroupDelete(LoginRequiredMixin, View):
    """Delete a ResourceGroup Object"""

    def post(self, request, resource_group_uuid):
        return delete_model_object(
            request=self.request,
            model=ResourceGroup,
            uuid=resource_group_uuid
        )


class ResourceCreate(LoginRequiredMixin, View):
    """Create a Resource object and associate it with the group that invoked
    the create request"""

    def post(self, request, resource_group_uuid, *args, **kwargs):
        if group_nested_object_count(
                request=self.request,
                model=Resource,
                group_uuid=resource_group_uuid,) <= 19:
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=ResourceCreateForm,
                model=Resource,
                obj_uuid=resource_group_uuid,
                group_model=ResourceGroup,
            )
        else:
            return JsonResponse({
                'error': "maximum 20 resource types per resource group"
            }, status=401)


class ResourceDelete(LoginRequiredMixin, View):
    """Delete a Resource object"""
    def post(self, request, resource_uuid):
        resource_to_delete = get_object_or_404(Resource, id=resource_uuid)
        if resource_to_delete.group.tool_session.session_owner.user.id == request.user.id:
            resource_to_delete.delete()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect('user_home')


class ResourceNameChange(LoginRequiredMixin, View):
    """Change a Resource object's name field """

    def post(self, request, resource_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceNameChangeForm,
            model=Resource,
            obj_uuid=resource_uuid,
            group_model=ResourceGroup,
        )


class ResourceQtyChange(LoginRequiredMixin, View):
    """Change a Resource quantity or production modifier """

    def post(self, request, resource_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceQuantityChangeForm,
            model=Resource,
            obj_uuid=resource_uuid,
            group_model=ResourceGroup,
        )


class ResourceProductionModifierChange(LoginRequiredMixin, View):
    """Change a Resource quantity or production modifier"""

    def post(self, request, resource_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceProductionModifierChangeForm,
            model=Resource,
            obj_uuid=resource_uuid,
            group_model=ResourceGroup,
        )


class GameTimerCreate(LoginRequiredMixin, View):
    """Create a GameTimer Object"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, GameTimer) == 0:
            return save_new_tool_and_associate_with_session(
                form=GameTimerCreateForm,
                request=self.request
            )
        else:
            return JsonResponse({
                'error': "only 1 timer per session is supported"
            }, status=401)


class GameTimerDelete(LoginRequiredMixin, View):
    """Delete a GameTimer Object"""

    def post(self, request, game_timer_uuid):
        return delete_model_object(
            request=self.request,
            model=GameTimer,
            uuid=game_timer_uuid
        )


class GameTimerTitleUpdate(LoginRequiredMixin, View):
    """Update the title of a GameTimer object"""

    def post(self, request, game_timer_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=GameTimerCreateForm,
            model=GameTimer,
            obj_uuid=game_timer_uuid,
            group_model=None
        )


class GameTimerDurationUpdate(LoginRequiredMixin, View):
    """update the saved_duration field of a GameTimer object"""

    def post(self, request, game_timer_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=GameTimerDurationUpdateForm,
            model=GameTimer,
            obj_uuid=game_timer_uuid,
            group_model=None
        )


class ScoringGroupCreate(LoginRequiredMixin, View):
    """Add a ScoringGroup to the database and associate it with the active tool
    session that the current user has open, post is ajax
    Resource Groups hold sets of resources"""

    def post(self, request, *args, **kwargs):
        if object_count(self.request, ScoringGroup) == 0:
            return save_new_tool_and_associate_with_session(
                form=ScoringGroupForm,
                request=self.request
            )
        else:
            return JsonResponse({
                'error': "only 1 scoring calculator per session is supported"
            }, status=401)


class ScoringGroupUpdate(LoginRequiredMixin, View):
    """Change a ScoringGroup title"""

    def post(self, request, scoring_group_uuid, *args, **kwargs):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=ResourceGroupForm,
            model=ScoringGroup,
            obj_uuid=scoring_group_uuid,
            group_model=ScoringGroup,
        )


class ScoringGroupDelete(LoginRequiredMixin, View):
    """Delete a ScoringGroup Object"""

    def post(self, request, scoring_group_uuid):
        return delete_model_object(
            request=self.request,
            model=ScoringGroup,
            uuid=scoring_group_uuid
        )


class ScoringGroupAddPlayers(LoginRequiredMixin, View):
    """associate selected Players with a ScoringGroup Object"""

    def post(self, request, scoring_group_uuid, *args, **kwargs):
        form = ScoringGroupAddPlayersForm(
            request.POST,
            active_tool_session_id=self.request.session['active_tool_session_id'],
            instance=ScoringGroup.objects.get(id=scoring_group_uuid),
        )
        if form.is_valid():
            form.save()
            return reload_current_url(self.request)

        else:
            print(form.errors)
            messages.error(request, f'form invalid: {form.errors}')
            return redirect('user_home')


class ScoringCategoryCreate(LoginRequiredMixin, View):
    """Create a ScoringCategorySimple object and associate it with the group
    that invoked the create request"""

    def post(self, request, scoring_group_uuid, *args, **kwargs):
        if group_nested_object_count(
                request=self.request,
                model=ScoringCategory,
                group_uuid=scoring_group_uuid,) <= 19:
            # erase player scores
            active_tool_session_id = self.request.session['active_tool_session_id']
            players = Player.objects\
                .filter(tool_session_id=active_tool_session_id)
            for player in players:
                player.score = None
                player.save()
            return create_or_update_obj_and_serialize(
                request=self.request,
                form=ScoringCategoryCreateForm,
                model=ScoringCategory,
                obj_uuid=scoring_group_uuid,
                group_model=ScoringGroup,
            )
        else:
            return JsonResponse({
                'error': "maximum 20 scoring categories per scoring calculator"
            }, status=401)


class ScoringCategoryDelete(LoginRequiredMixin, View):
    """Delete a ScoringCategorySimple object"""

    def post(self, request, category_uuid):
        category_to_delete = get_object_or_404(
            ScoringCategory, id=category_uuid
        )
        if category_to_delete\
                .group.tool_session\
                .session_owner.user.id == request.user.id:
            category_to_delete.delete()
            # erase player scores
            active_tool_session_id = self.request.session[
                'active_tool_session_id']
            players = Player.objects \
                .filter(tool_session_id=active_tool_session_id)
            for player in players:
                player.score = None
                player.save()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
            return redirect('user_home')


class PlayerScoreUpdate(LoginRequiredMixin, View):
    """Update a Player score value"""

    def post(self, request, player_uuid):
        return create_or_update_obj_and_serialize(
            request=self.request,
            form=PlayerScoreForm,
            model=Player,
            obj_uuid=player_uuid,
            group_model=None,
        )