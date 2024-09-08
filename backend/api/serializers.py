from rest_framework import serializers
from .models import Note, User, UserInfo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ["id", "role", "fullName", "email", "gradeLevel", "phone", "cpr", "school", "additional_data"]
        extra_kwargs = {"email": {"required": True}}

    def create(self, validated_data):
        print("hey")
        additional_data = validated_data.pop('additional_data', {})
        user_info = UserInfo.objects.create(**validated_data, additional_data=additional_data)
        return user_info
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","content", "created_at","author"]
        extra_kwargs = {"author": {"read_only": True}}