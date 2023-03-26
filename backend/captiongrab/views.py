from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets

from captiongrab.src.transcript import getTranscript
from .serializers import RawTranscriptSerializer
from .models import RawTranscript
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Create your views here.


def index(request):
    return HttpResponse("Index page")


class RawTranscriptView(viewsets.ModelViewSet):
    serializer_class = RawTranscriptSerializer
    queryset = RawTranscript.objects.all()


@csrf_exempt
@api_view(['POST'])
def receiveURL(request):
    if request.method == 'POST':
        url = request.data['url']
        return JsonResponse({'title': url, 'text': getTranscript(url)})
