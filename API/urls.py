
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
""" router.register(r'lead_attachments', views.lead_attachments, basename='lead_attachment') """

urlpatterns = [path('', include(router.urls)), path(
    'lead_attachments/<int:lead>/', views.lead_attachments),
    path('get_file/<int:pk>/', views.get_file),
    path('lead_comments/<int:lead>/', views.lead_comments), ]
