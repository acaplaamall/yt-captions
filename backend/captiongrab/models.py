from django.db import models

# Create your models here.


class RawTranscript(models.Model):
    title = models.CharField(max_length=120)
    text = models.TextField()

    def _str_(self):
        return self.title
