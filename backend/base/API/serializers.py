from rest_framework import serializers
from ..models import Notes


class NoteSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')  # Does not rely on Django models. # mapping serializer to the model/ fields # Get the username from the model

    class Meta:
        model = Notes
        fields = ['id', 'body', 'username']




