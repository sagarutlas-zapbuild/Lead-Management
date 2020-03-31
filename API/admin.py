from django.contrib import admin
from .models import Lead, Prospect, Attachment, Comment, User

# Register your models here.
admin.site.register(Lead)
admin.site.register(Prospect)
admin.site.register(Attachment)
admin.site.register(Comment)
admin.site.register(User)