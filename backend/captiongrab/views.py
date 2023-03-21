from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import RawTranscriptSerializer
from .models import RawTranscript
# Create your views here.


def index(request):
    return HttpResponse("Index page")


class RawTranscriptView(viewsets.ModelViewSet):
    serializer_class = RawTranscriptSerializer
    queryset = RawTranscript.objects.all()
