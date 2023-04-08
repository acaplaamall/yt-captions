from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('transcript/new/', views.receiveURL, name="transcript/new/"),
    path('transcript/save/', views.saveRaw, name="transcript/save/"),
    path('transcripts/', views.getTranscripts, name="transcripts/"),

]
