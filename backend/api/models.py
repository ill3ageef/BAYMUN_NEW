from django.db import models
from django.utils import timezone
from django.contrib.auth import models as auth_models


class UserManager(auth_models.BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError("User must have an email")

        if not first_name:
            raise ValueError("User must have a first name")
        
        user = self.model(email=self.normalize_email(email))
        user.user_name = None
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, name, role, email, password):
        user = self.create_user(
            name=name,
            email=email,
            password=password,
        )

        user.save()
        return user


class User(auth_models.AbstractBaseUser, auth_models.PermissionsMixin):

    email = models.EmailField(unique=True)
    user_name = None
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    is_superuser = models.BooleanField()
    delegation = models.CharField(max_length=150, blank=True)
    



    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.user_name



#Will remove -- was only part of testing
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    


class Council(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField()

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title