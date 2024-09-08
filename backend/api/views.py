from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, UserInfoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, User, UserInfo

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreateUserInfoView(generics.CreateAPIView):
    #queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [AllowAny]
