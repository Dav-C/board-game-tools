from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from .models import (
    UserProfile,
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
    ResourceGroup,
    Resource,
    ScoringGroup,
    ScoringCategory,
    Player,
    GameTimer,
    DrawBag,
    DrawBagItem,
)


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    username = forms.CharField(max_length=20)


class ToolSessionForm(forms.ModelForm):
    """create new tool session objects"""
    class Meta:
        model = ToolSession
        fields = ['session_name']

    session_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'session name',
                'autocomplete': 'off',
            },
        ),
    )


class PlayerForm(forms.ModelForm):
    """Create and update Player objects"""
    class Meta:
        model = Player
        fields = ['name', 'color', 'score']

    name = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'player name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    color = forms.ChoiceField(
        required=False,
        choices=Player.player_color_choices,
        widget=forms.Select(
            attrs={
                'autocomplete': 'off',
            },
        ),
    )
    score = forms.FloatField(
        required=False,
        widget=forms.NumberInput(
            attrs={}
        ),
    ),


class HpTrackerForm(forms.ModelForm):
    """create and update HpTracker objects"""
    class Meta:
        model = HpTracker
        fields = ['title', 'hp_value']

    title = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'HP Tracker Title',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )

    hp_value = forms.IntegerField(
        required=False,
        initial=0,
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'Initial HP Value',
                'maxlength': '40'
            },
        ),
    )


class DieGroupForm(forms.ModelForm):
    """create and update DieGroup objects"""
    class Meta:
        model = DieGroup
        fields = ['title']

    title = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'die collection name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )


class DieStandardForm(forms.ModelForm):
    """create and update DieStandard objects"""
    class Meta:
        model = DieStandard
        fields = ['num_sides']

    num_sides = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'sides'
            },
        ),
    )


class ResourceGroupForm(forms.ModelForm):
    """create and update ResourceGroup objects"""
    class Meta:
        model = ResourceGroup
        fields = ['title']

    title = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )


class ResourceForm(forms.ModelForm):
    """Create a Resource object and declare if it will be using the
    production feature or not"""

    class Meta:
        model = Resource
        fields = ['name', 'quantity',
                  'production_available',
                  'production_modifier']

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    quantity = forms.IntegerField(
        required=False,
        initial=0,
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'amount',
                'maxlength': '4',
                'autocomplete': 'off',
            },
        ),
    )
    production_available = forms.BooleanField(
        required=False,
        initial=False,
        widget=forms.CheckboxInput(
            attrs={
            },
        ),
    )
    production_modifier = forms.IntegerField(
        required=False,
        initial=0,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '4',
                'autocomplete': 'off',
            },
        ),
    )


class GameTimerForm(forms.ModelForm):
    """Create and update GameTimer Objects"""
    class Meta:
        model = GameTimer
        fields = ['title', 'saved_duration']

    title = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'timer title',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    saved_duration = forms.CharField(
        required=True,
        initial=0,
        widget=forms.TextInput(
            attrs={},
        )
    )


class ScoringGroupForm(forms.ModelForm):
    """Create and modify ScoringGroup objects"""
    class Meta:
        model = ScoringGroup
        fields = ['title']

    title = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'name of game',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )


class CustomMMCFAddPlayers(forms.ModelMultipleChoiceField):
    """customize the label for the ScoringGroupAddPlayersForm
    This is not strictly necessary but is here for future customization"""
    def label_from_instance(self, obj):
        return f'{obj.name}'


class ScoringGroupAddPlayersForm(forms.ModelForm):
    """associate players with a scoring group"""

    class Meta:
        model = ScoringGroup
        fields = ['players']

    def __init__(self, *args, **kwargs):
        self.active_tool_session_id = kwargs.pop("active_tool_session_id")
        super(ScoringGroupAddPlayersForm, self).__init__(*args, **kwargs)
        self.fields['players'] = \
            CustomMMCFAddPlayers(
                required=False,
                widget=forms.CheckboxSelectMultiple(),
                queryset=Player.objects.filter(
                    tool_session_id=self.active_tool_session_id
                )
            )


class ScoringCategoryForm(forms.ModelForm):
    """Create a ScoringCategory object """
    class Meta:
        model = ScoringCategory
        fields = ['name',
                  'points_gained_or_lost',
                  'items_per_group',
                  'rounding']

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'cards, coins, etc.',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    points_gained_or_lost = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'number',
                'maxlength': '4',
                'autocomplete': 'off',
            },
        ),
    )
    items_per_group = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'number',
                'maxlength': '4',
                'autocomplete': 'off',
            },
        ),
    )
    rounding = forms.ChoiceField(
        required=True,
        choices=ScoringCategory.rounding_choices,
        widget=forms.Select(
            attrs={
                'autocomplete': 'off',
            },
        ),
    )


class DrawBagForm(forms.ModelForm):
    """Create GameTimer Objects"""
    class Meta:
        model = DrawBag
        fields = ['title']

    title = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'draw bag title',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )


class DrawBagItemCreateForm(forms.ModelForm):
    """Create DrawBagItem Objects"""
    class Meta:
        model = DrawBagItem
        fields = ['name', 'image']

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'draw bag title',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    image = forms.ImageField(
        required=False,
        widget=forms.FileInput(
            attrs={
                'placeholder': 'draw bag image',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )

