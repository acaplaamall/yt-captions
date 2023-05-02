from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets
from captiongrab.forms import CreateTranscript
from captiongrab.src.transcript import *
from .serializers import RawTranscriptSerializer
from .models import RawTranscript
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core import serializers

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
        return JsonResponse({'text': getTimestampedTranscript(url), 'title': getTitle(url)})


@csrf_exempt
@api_view(['POST'])
def saveRaw(request):
    if request.method == 'POST':
        url = request.data['url']
        obj = CreateTranscript(
            {'title': getTitle(url), 'vidId': url, 'transcript': getRawTranscript(url)})

        if obj.is_valid():
            obj.save()
            return JsonResponse({'status': 'ok'})
        else:
            return JsonResponse({'status': 'error'})


@csrf_exempt
@api_view(['GET'])
def getTranscripts(request):
    if request.method == 'GET':
        qs = RawTranscript.objects.all()
        qs_json = serializers.serialize('json', qs)
        return HttpResponse(qs_json, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
def searchTranscripts(request):
    if request.method == 'GET':
        qs = RawTranscript.objects.all()
        qs_json = serializers.serialize('json', qs)
        return HttpResponse(qs_json, content_type='application/json')


@csrf_exempt
@api_view(['DELETE'])
def deleteTranscript(request, id):
    if request.method == 'DELETE':
        currId = int(id)
        try:
            tr = RawTranscript.objects.get(id=currId)
        except RawTranscript.DoesNotExist:
            return JsonResponse({'status': 'error'})
        tr.delete()
        return JsonResponse({'status': 'ok'})
