from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
""" from django.contrib.auth.models import UserManager """

# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, user_email, user_name, password):
        if not user_email:
            raise ValueError("ENTER AN EMAIL BUDDY")
        if not user_name:
            raise ValueError("I KNOW YOU HAVE A NAME")
        if not password:
            raise ValueError("PASSWORD?!?!?!? HELLO??")
        user = self.model(
             user_email = self.normalize_email(user_email),
             user_name = user_name)
        user.set_password(password)
        user.save()
        return user

class Prospect(models.Model):
    prospect_id = models.AutoField(primary_key=True, unique=True)
    prospect_full_name = models.CharField(max_length=50)
    prospect_company = models.CharField(max_length=100)
    prospect_designation = models.CharField(max_length=50)
    prospect_skype_id = models.CharField(max_length=50)
    prospect_street_address = models.CharField(max_length=40)
    prospect_city = models.CharField(max_length=20)
    prospect_state = models.CharField(max_length=20)
    prospect_country = models.CharField(max_length=55)
    prospect_phone = models.BigIntegerField(unique=True)
    prospect_email = models.EmailField(unique=True)


class Lead(models.Model):
    lead_id = models.AutoField(primary_key=True, unique=True)
    lead_prospect = models.ForeignKey(
        Prospect, on_delete=models.CASCADE, related_name='lead')
    lead_title = models.CharField(max_length=50)
    lead_source = models.CharField(max_length=50)
    lead_description = models.TextField()
    lead_url = models.URLField()
    lead_domain = models.CharField(max_length=50)
    lead_technology = models.CharField(max_length=50)
    lead_estimated_budget = models.DecimalField(
        max_digits=15, decimal_places=2)
    lead_reffered_by = models.CharField(max_length=50)
    lead_assignee = models.CharField(max_length=50)
    lead_status = models.CharField(max_length=20, default='New')
    lead_keyword_tags = models.CharField(max_length=100)
    lead_date = models.DateTimeField(auto_now_add=True)


class Attachment(models.Model):
    attachment_id = models.AutoField(primary_key=True, unique=True)
    attachment = models.FileField(upload_to='uploads/')
    attachment_lead = models.ForeignKey(
        Lead, on_delete=models.CASCADE, related_name='attachment')


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True, unique=True)
    comment = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_lead = models.ForeignKey(
        Lead, on_delete=models.CASCADE, related_name='comment')


class User(AbstractBaseUser, PermissionsMixin):
    
    user_name = models.CharField(max_length=25)
    user_email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    

    EMAIL_FIELD = 'user_email'
    USERNAME_FIELD = 'user_email'
    objects = UserManager()