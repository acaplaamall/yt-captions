from django.db import models

# Create your models here.


class RawTranscript(models.Model):
    title = models.CharField(max_length=120)
    vidId = models.CharField(max_length=120)
    transcript = models.TextField()

    class Meta:
        unique_together = ["title", "vidId"]

    def _str_(self):
        return self.title
