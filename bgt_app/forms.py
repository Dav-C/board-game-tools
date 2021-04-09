from django import forms

from .models import (
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
    ResourceGroup,
    Resource,
    ScoringGroup,
    ScoringCategorySimple,
    ScoringCategoryItemsPerPoint,
    ScoringCategoryPointsPerItem,
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


class ScoringCategorySimpleForm(forms.ModelForm):
    """Create a ScoringCategorySimple object or update the name field"""
    class Meta:
        model = ScoringCategorySimple
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


class ScoringCategoryItemsPerPointCreateForm(forms.ModelForm):
    """Create a ScoringCategoryItemsPerPoint object"""
    class Meta:
        model = ScoringCategoryItemsPerPoint
        fields = ['name', 'round_up_down']

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    ),
    round_up_down = forms.ChoiceField(
        required=True,
        widget=forms.Select(
            attrs={
                'autocomplete': 'off',
            },
        ),
    )


class ScoringCategoryItemsPerPointNameChangeForm(forms.ModelForm):
    """Change the name of a ScoringCategoryItemsPerPoint object"""
    class Meta:
        model = ScoringCategoryItemsPerPoint
        fields = ['name', 'round_up_down']

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Name',
                'maxlength': '40',
                'autocomplete': 'off',
            },
        ),
    ),


class ScoringCategoryItemsPerPointUpdateForm(forms.ModelForm):
    """Update a ScoringCategoryItemsPerPoint object"""
    class Meta:
        model = ScoringCategoryItemsPerPoint
        fields = ['points', 'scoring_items_qty',
                  'items_per_point_trigger', 'points_per_point_trigger']

    points = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),
    scoring_items_qty = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),
    items_per_point_trigger = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),
    points_per_point_trigger = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),


class ScoringCategoryPointsPerItemForm(forms.ModelForm):
    """Change the name of a ScoringCategoryPointsPerItem object"""

    class Meta:
        model = ScoringCategoryPointsPerItem
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


class ScoringCategoryPointsPerItemUpdateForm(forms.ModelForm):
    """Update a ScoringCategoryPointsPerItem object"""

    class Meta:
        model = ScoringCategoryPointsPerItem
        fields = ['points', 'scoring_items_qty', 'points_per_item']

    points = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),
    scoring_items_qty = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    ),
    points_per_item = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'maxlength': '5',
                'autocomplete': 'off',
            },
        ),
    )
