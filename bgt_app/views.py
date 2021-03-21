from django.shortcuts import render
from django.views.generic import (
    View,
    ListView,
    CreateView,
    DetailView,
    UpdateView,
    DeleteView
)
from django.contrib.auth.mixins import (
    LoginRequiredMixin,
    PermissionRequiredMixin,
)
from django.shortcuts import (
    redirect,
    reverse,
    get_object_or_404
)
from django.contrib import messages
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import FormMixin

from .forms import (
    ToolSessionForm,
    HpTrackerForm,
    HpChangeValueForm
)

from .models import (
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


class ToolSessionDetail(DetailView):
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
        serialized_hp_tracker_data = serializers.serialize('json', hp_trackers)
        context['hp_tracker_form'] = HpTrackerForm
        context['hp_change_value_form'] = HpChangeValueForm
        context['hp_trackers'] = hp_trackers
        context['serialized_hp_tracker_data'] = serialized_hp_tracker_data
        return context

    def get(self, request, *args, **kwargs):
        get_return = super().get(request, *args, **kwargs)
        self.request.session['active_tool_session_id'] = str(self.object.id)
        return get_return


def save_form_and_serialize_data(form, request):
    """This function is used inside other views for saving new models via
    ajax requests"""
    if form.is_valid():
        form_instance = \
            form.save(commit=False)
        # add foreign key for the tool session the hp tracker should
        # be linked to and save
        form_instance.tool_session = \
            ToolSession.objects.get(
                id=request.session['active_tool_session_id']
            )
        form_instance.save()
        serialized_form_instance = serializers.serialize(
            'json', [form_instance, ])
        return JsonResponse(
            {'form_instance': serialized_form_instance}, status=200)
    else:
        return JsonResponse({'error': form.errors}, status=400)


# REMINDER TO SELF - ADD USER VALIDATION TO ALL POST REQUEST METHODS

class AddHpTracker(View):
    """Add an HpTracker to the database and associate it
    with the active tool session that the current user has open, post is ajax"""
    def post(self, request, *args, **kwargs):
        hp_tracker_form = \
            HpTrackerForm(self.request.POST)

        new_hp_tracker_response = save_form_and_serialize_data(
            form=hp_tracker_form,
            request=self.request
        )
        return new_hp_tracker_response


class HpChangeValue(View):
    """Increase an HP tracker's HP value"""
    def post(self, request, uuid):
        hp_tracker = HpTracker.objects.get(id=uuid)
        form = HpChangeValueForm(request.POST or None, instance=hp_tracker)
        if form.is_valid():
            form_instance = \
                form.save()
            serialized_form_instance = serializers.serialize(
                'json', [form_instance, ])
            return JsonResponse(
                {'form_instance': serialized_form_instance}, status=200)
        else:
            return JsonResponse({'error': form.errors}, status=400)