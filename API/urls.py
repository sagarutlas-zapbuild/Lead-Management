
from rest_framework.routers import DefaultRouter

from django.urls import path, include
from django.urls import path
from . import views


router = DefaultRouter()
router.register(r'prospects', views.ProspectViewSet, basename='prospect')
router.register(r'leads', views.LeadViewSet, basename='lead')
router.register(r'attachments', views.AttachmentViewSet, basename='attachment')
router.register(r'comments', views.CommentViewSet, basename='comment')
router.register(r'users', views.UserViewSet, basename='user')
""" router.register('current_user', views.current_user, basename='current_user') """

urlpatterns = [path('', include(router.urls)), path('current_user/', views.current_user),]
