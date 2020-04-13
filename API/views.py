from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LeadSerializer, ProspectSerializer, AttachmentSerializer, CommentSerializer, UserSerializer
from django.http import HttpResponse
from rest_framework import status
from .models import Lead, Prospect, Attachment, Comment, User
from rest_framework.decorators import action
from rest_framework_jwt import authentication
from rest_framework_jwt.views import VerifyJSONWebToken
import json
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


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
        pass

    def partial_update(self, request, pk=None):
        pass

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
            print("\n\nlead\n",lead,"\n\n\n")
            attachments = request.data['attachments']
            print("\n\nattachments\n",attachments,"\n\n\n")
            for attachment in attachments:
                print("\n\nattachment\n",attachment,"\n\n\n")
                obj = AttachmentSerializer(data=attachment)
                print("\n\nobj\n",obj.initial_data, "\n\n\n")
                if obj.is_valid():
                    
                    obj.save()
                else: 
                    return Response(obj.errors, status=status.HTTP_400_BAD_REQUEST)
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
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def list(self, request):
        serializer = AttachmentSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        for attachment in request.data:
            serializer = AttachmentSerializer(data=attachment)
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
