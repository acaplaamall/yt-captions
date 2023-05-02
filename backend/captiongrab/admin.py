from django.contrib import admin
from .models import RawTranscript

# Register your models here.


class RawTranscriptAdmin(admin.ModelAdmin):
    list_display = ('title', 'vidId', 'transcript')

# Register your models here.


admin.site.register(RawTranscript, RawTranscriptAdmin)
