from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date

# Create your models here.
class AppUser(AbstractUser):
    name = models.CharField(max_length=250, null=False, default='unkown')
    email = models.EmailField(
        verbose_name='email address',
        max_length= 255,
        unique=True,
    )
    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS= []
    
class Task(models.Model):
    title=models.CharField(max_length=250, null=False, default="Unknown")
    description=models.TextField(null=False, default="No description provided")
    date=models.DateField(null=False, default=date.today())
    user=models.ForeignKey('AppUser', on_delete=models.CASCADE)