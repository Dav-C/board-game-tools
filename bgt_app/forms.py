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
    """Create new tool session objects"""
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
        fields = ['name', 'color']

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
        required=True,
        choices=Player.player_color_choices,
        widget=forms.Select(
            attrs={
                'autocomplete': 'off',
            },
        ),
    )


class PlayerScoreForm(forms.ModelForm):
    """change a Player score value"""
    class Meta:
        model = Player
        fields = ['score']

    score = forms.FloatField(
        required=False,
        widget=forms.NumberInput(
            attrs={}
        ),
    ),


class HpTrackerCreateForm(forms.ModelForm):
    """Create new HpTracker objects"""
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


class HpTrackerChangeValueForm(forms.ModelForm):
    """update HpTracker values via ajax"""
    class Meta:
        model = HpTracker
        fields = ['hp_value', 'title']

    title = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    )
    hp_value = forms.IntegerField(
        required=False,
        widget=forms.NumberInput(
            attrs={
            },
        ),
    )


class DieGroupForm(forms.ModelForm):
    """Create new Die Group objects"""
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


class DieGroupUpdateForm(forms.ModelForm):
    """update Die Group objects"""
    class Meta:
        model = DieGroup
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


class DieStandardForm(forms.ModelForm):
    """Create and modify standard dice"""
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
    """Create and modify Resource Group objects"""
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


class ResourceCreateForm(forms.ModelForm):
    """Create a Resource object and declare if it will be using the
    production feature or not"""

    class Meta:
        model = Resource
        fields = ['name', 'production_available']

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

    production_available = forms.BooleanField(
        required=False,
        initial=False,
        widget=forms.CheckboxInput(
            attrs={
            },
        ),
    )


class ResourceNameChangeForm(forms.ModelForm):
    """Change the name of a Resource object"""

    class Meta:
        model = Resource
        fields = ['name']

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


class ResourceQuantityChangeForm(forms.ModelForm):
    """Create and modify Resources objects"""
    class Meta:
        model = Resource
        fields = ['quantity']

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


class ResourceProductionModifierChangeForm(forms.ModelForm):
    """Change the production modifier of resource objects"""

    class Meta:
        model = Resource
        fields = ['production_modifier']

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


class GameTimerCreateForm(forms.ModelForm):
    """Create GameTimer Objects"""
    class Meta:
        model = GameTimer
        fields = ['title']

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


class GameTimerDurationUpdateForm(forms.ModelForm):
    """Update the saved_duration field of a GameTimer"""
    class Meta:
        model = GameTimer
        fields = ['saved_duration']

    saved_duration = forms.CharField(
        required=True,
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


class ScoringCategoryCreateForm(forms.ModelForm):
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

