from rest_framework import serializers
from .models import Note, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","content", "created_at","author"]
        extra_kwargs = {"author": {"read_only": True}}