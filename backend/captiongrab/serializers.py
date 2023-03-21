from rest_framework import serializers
from .models import RawTranscript


class RawTranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawTranscript
        fields = ('id', 'title', 'text')
