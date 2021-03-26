from django import forms

from .models import (
    ToolSession,
    HpTracker,
    DieGroup,
    DieStandard,
)


class ToolSessionForm(forms.ModelForm):
    """Create new tool session objects"""
    class Meta:
        model = ToolSession
        fields = ['session_name']

    session_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
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
            },
        ),
    )
    hp_value = forms.IntegerField(
        required=False,
        widget=forms.NumberInput(
            attrs={
                'type': 'hidden'
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
