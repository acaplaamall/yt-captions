from django import forms
from .models import RawTranscript


class CreateTranscript(forms.ModelForm):
    class Meta:
        model = RawTranscript
        fields = '__all__'
