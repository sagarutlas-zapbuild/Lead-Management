from rest_framework import serializers
from .models import Lead, Prospect, Attachment, Comment, User
from rest_framework.response import Response
from rest_framework import status


class ProspectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prospect
        fields = '__all__'


class LeadSerializer(serializers.ModelSerializer):
    """ lead_prospect = ProspectSerializer() """
    """ lead_attachment = lead.comment """
    class Meta:
        model = Lead
        fields = '__all__'

    def create(self, validated_data):
        """ prospect_data = validated_data.pop('lead_prospect')
        prospect = Prospect.objects.create(**prospect_data) """
        """ lead_prospect=prospect, """
        lead = Lead.objects.create( **validated_data)
        """ attachment_data = validated_data.pop('lead_attachment')
        attachments = []
        for attachment_object in attachment_data:
            attachments.append(attachment.objects.create(**attachment_object)) """
        return (lead)


class AttachmentSerializer(serializers.ModelSerializer):
    attachment_lead = LeadSerializer()

    class Meta:
        model = Attachment
        fields = ('attachment_id', 'attachment', 'attachment_lead')


class CommentSerializer(serializers.ModelSerializer):
    comment_lead = LeadSerializer()

    class Meta:
        model = Comment
        fields = ('comment', 'comment_id', 'comment_date', 'comment_lead')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
