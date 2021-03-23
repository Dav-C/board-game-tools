from django import forms

from .models import (
    ToolSession,
    HpTracker,
)


class ToolSessionForm(forms.ModelForm):
    class Meta:
        model = ToolSession
        fields = ['session_name']

    session_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
            },
        ),
    )


class HpTrackerForm(forms.ModelForm):
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
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'Initial HP Value',
                'maxlength': '40'
            },
        ),
    )


class HpTrackerChangeValueForm(forms.ModelForm):
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

