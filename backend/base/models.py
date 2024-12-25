from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=255)

    def __str__(self):
        return self.body



