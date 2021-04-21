from django import forms

from .models import (
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
    ResourceGroup,
    Resource,
    ScoringGroup,
    ScoringCategory,
    Player,
)


class ToolSessionForm(forms.ModelForm):
    """Create new tool session objects"""
    class Meta:
        model = ToolSession
        fields = ['session_name']

    session_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
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

class HpTrackerAddForm(forms.ModelForm):
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
                'placeholder': 'Name',
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
            attrs={},
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


class ScoringGroupForm(forms.ModelForm):
    """Create and modify ScoringGroup objects"""
    class Meta:
        model = ScoringGroup
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


# class ScoringCategoryNameChangeForm(forms.ModelForm):
#     """Change the name of a ScoringCategory object """
#     class Meta:
#         model = ScoringCategory
#         fields = ['name']
#
#     name = forms.CharField(
#         required=True,
#         widget=forms.TextInput(
#             attrs={
#                 'placeholder': 'Name',
#                 'maxlength': '40',
#                 'autocomplete': 'off',
#             },
#         ),
#     )
#
#
# class ScoringCategoryPointsForm(forms.ModelForm):
#     """Change the points field of a ScoringCategorySimple object"""
#     class Meta:
#         model = ScoringCategory
#         fields = ['points']
#
#     points = forms.IntegerField(
#         required=True,
#         widget=forms.NumberInput(
#             attrs={
#                 'maxlength': '4',
#                 'autocomplete': 'off',
#             },
#         ),
#     )

