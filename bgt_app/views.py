from random import randint
import json
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
    ToolSessionForm,
    HpTrackerAddForm,
    HpTrackerChangeValueForm,
    DieGroupForm,
    DieStandardForm,
)

from .models import (
    DieGroup,
    DieStandard,
    HpTracker,
    ToolSession,
    UserProfile
)


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
        hp_trackers = self.object.hp_tracker.all()
        die_groups = DieGroup.objects\
            .filter(tool_session_id=self.request.session['active_tool_session_id'])\
            .annotate(group_dice_sum=Sum('standard_dice__rolled_value'))

        context['add_hp_tracker_form'] = HpTrackerAddForm
        context['hp_change_value_form'] = HpTrackerChangeValueForm
        context['hp_trackers'] = hp_trackers
        context['die_group_form'] = DieGroupForm
        context['die_groups'] = die_groups
        context['add_die_standard_form'] = DieStandardForm
        return context

    def get(self, request, *args, **kwargs):
        get_return = super().get(request, *args, **kwargs)
        # put the active tool session id into a session value to be used for
        # assigning new objects to the right tool session other views
        self.request.session['active_tool_session_id'] = str(self.object.id)
        return get_return


def save_form_and_serialize_data(form, request):
    """This function is used inside other views for saving new models via
    ajax requests.  The active tool session is associated with the new object."""

    if form.is_valid():
        print(request.session['active_tool_session_id'])
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


def reload_current_url(request):
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


class AddHpTracker(LoginRequiredMixin, View):
    """Add an HpTracker to the database and associate it
    with the active tool session that the current user has open, post is ajax"""

    def post(self, request, *args, **kwargs):
        hp_tracker_form = HpTrackerAddForm(self.request.POST)
        new_hp_tracker_response = save_form_and_serialize_data(
            form=hp_tracker_form,
            request=self.request
        )
        return new_hp_tracker_response


class HpTrackerUpdate(LoginRequiredMixin, View):
    """Change an HpTracker hp_value and/or title"""

    def post(self, request, uuid):
        hp_tracker = HpTracker.objects.get(id=uuid)
        form = HpTrackerChangeValueForm(
            request.POST or None, instance=hp_tracker
        )
        if form.is_valid():
            form_instance = \
                form.save()
            serialized_form_instance = serializers.serialize(
                'json', [form_instance, ])
            return JsonResponse(
                {'form_instance': serialized_form_instance}, status=200)
        else:
            return JsonResponse({'error': form.errors.as_json()}, status=400)


class HpTrackerDelete(LoginRequiredMixin, View):
    """Delete an HpTracker Object"""

    def post(self, request, uuid):
        hp_tracker = HpTracker.objects.get(id=uuid)
        if hp_tracker.tool_session.session_owner.user.id == request.user.id:
            hp_tracker.delete()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect('user_home')


class AddDieGroup(LoginRequiredMixin, View):
    """Add an HpTracker to the database and associate it with the active tool
    session that the current user has open, post is ajax
    Die Groups hold sets of dice so they can more easily be separated for
    gameplay purposes and processed (rolled) as a group."""

    def post(self, request, *args, **kwargs):
        die_group_form = DieGroupForm(self.request.POST)
        new_die_group_response = save_form_and_serialize_data(
            form=die_group_form,
            request=self.request
        )
        return new_die_group_response


class AddDieStandard(LoginRequiredMixin, View):
    """Add a DieStandard object and associate it with the group that invoked the
    add request"""

    def post(self, request, die_group_uuid, *args, **kwargs):
        form = DieStandardForm(self.request.POST)
        if form.is_valid():
            form_instance = form.save(commit=False)
            # add foreign key for the die group the new die
            # should be linked to and save
            form_instance.die_group = \
                DieGroup.objects.get(
                    id=die_group_uuid
                )
            form_instance.save()
            return reload_current_url(request)
        else:
            messages.error(request, "Insufficient Permission")
        return redirect('user_home')


class RollDieGroup(LoginRequiredMixin, View):
    """Randomize all the die values in a die group"""
    def get(self, request, die_group_uuid):
        die_group_dice = DieStandard.objects.filter(die_group_id=die_group_uuid)
        for die in die_group_dice:
            die.rolled_value = randint(2, int(die.num_sides))
            die.save()

        die_groups = DieGroup.objects\
            .filter(tool_session_id=self.request.session['active_tool_session_id'])\
            .annotate(group_dice_sum=Sum('standard_dice__rolled_value'))

        # calculate the roll sum for each die group and add it to a dict
        # Annotations do not carry through the serializer, so this needs to be
        # calculated here.
        die_group_sums = {}
        index_increment = 0
        for sum_value in die_groups:
            die_group_sums[index_increment] = \
                {'pk': str(sum_value.pk),
                 'die_group_sum_value': int(sum_value.group_dice_sum)}
            index_increment += 1

        serialized_dice_values = serializers.serialize(
            'json', list(die_group_dice), fields=('rolled_value', 'id'))
        serialized_die_group_sums = json.dumps(die_group_sums)
        return JsonResponse({
            'die_group_dice': serialized_dice_values,
            'die_group_sums': serialized_die_group_sums,
                            }, status=200)


class RollDie(LoginRequiredMixin, View):
    """Randomize the value for 1 die, selected by the user"""
    def get(self, request, die_uuid):
        die = DieStandard.objects.get(id=die_uuid)
        die.rolled_value = randint(2, int(die.num_sides))
        die.save()

        serialized_die_value = serializers.serialize(
            'json', [die]
        )
        return JsonResponse({
            'rolled_die_value': serialized_die_value
                            }, status=200)