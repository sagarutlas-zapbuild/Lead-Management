from django.shortcuts import render

from rest_framework import viewsets, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LeadSerializer, ProspectSerializer, AttachmentSerializer, CommentSerializer, UserSerializer
from django.http import HttpResponse, FileResponse
from django.core.files.base import ContentFile
from rest_framework import status
from .models import Lead, Prospect, Attachment, Comment, User
from rest_framework.decorators import action
from rest_framework_jwt import authentication
from rest_framework_jwt.views import VerifyJSONWebToken
import json
import base64
import pdb
import six
from rest_framework.decorators import api_view

# Create your views here.
class MyRenderer(renderers.BaseRenderer):
    """
        Return data as-is. View should supply a Response.
    """
    media_type = ''
    format = ''
    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data

@api_view(['GET'])
def lead_attachments(request, lead=None):
    """
    get attachments of a lead
    """
    serializer = AttachmentSerializer(
        Attachment.objects.filter(attachment_lead=lead), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def lead_comments(request, lead=None):
    """
    get comments of a lead
    """
    serializer = CommentSerializer(
        Comment.objects.filter(comment_lead=lead), many=True)
    return Response(serializer.data)


@action(Method=['GET'], detail=True, renderer_classes=(MyRenderer,))
def get_file(request, pk=None):
    """
    get the uploaded file
    """
    instance = Attachment.objects.get(attachment_id=pk)
    file = instance.attachment.file.open()
    response = FileResponse(file, content_type=None)
    """ response['Content-Length'] = instance.attachment.size
    response['Content-Disposition'] = 'attachment; filename="%s"' % instance.attachment.name """

    return response


class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def list(self, request):
        serializer = CommentSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class ProspectViewSet(viewsets.ModelViewSet):
    queryset = Prospect.objects.all()
    serializer_class = ProspectSerializer

    def list(self, request):
        data = Prospect.objects.all().values('prospect_full_name',
                                             'prospect_id',
                                             'prospect_company',
                                             'prospect_designation',
                                             'prospect_phone',
                                             'prospect_email')
        return Response(data)

    def create(self, request):
        serializer = ProspectSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                return Response(serializer.errors, status=status.HTTP_409_CONFLICT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        prospect = ProspectSerializer(Prospect.objects.get(prospect_id=pk))
        return Response(prospect.data)

    def update(self, request, pk=None):
        serializer = ProspectSerializer(data=request.data)
        if serializer.update(Prospect.objects.get(prospect_id=pk), request.data):
            return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        serializer = ProspectSerializer(data=request.data, partial=True)
        if serializer.update(Prospect.objects.get(prospect_id=pk), request.data):
            return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        pass


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def list(self, request):
        data = Lead.objects.all().values('lead_id',
                                         'lead_title',
                                         'lead_status',
                                         'lead_prospect')
        return Response(data)

    def create(self, request):
        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            lead = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        lead = LeadSerializer(Lead.objects.get(lead_id=pk))
        return Response(lead.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        serializer = LeadSerializer(data=request.data, partial=True)
        if serializer.update(Lead.objects.get(lead_id=pk), request.data):
            return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        pass


class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all().order_by('attachment_lead')
    serializer_class = AttachmentSerializer

    def list(self, request):
        serializer = AttachmentSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        print(request.data)
        """ for attachment in request.data: """
        serializer = AttachmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (authentication.JSONWebTokenAuthentication, )

    def list(self, request):
        serializer = UserSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
