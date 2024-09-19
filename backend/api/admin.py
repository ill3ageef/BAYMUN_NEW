from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserInfo, User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser')
    ordering = ('id', 'email')

@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):

    def baymun_id(self, obj):
        return f"BAYMUN2411{obj.id:04d}"

    baymun_id.short_description = "Trans. ID"

    list_display = ('id', 'baymun_id', 'fullName', 'role', 'email', 'gradeLevel', 'school', 'phone', 'has_payed')
    list_filter = ('role', 'gradeLevel', 'school')
    list_editable = ("has_payed",)
    
    search_fields = ('fullName', 'email', 'phone', 'cpr')

    ordering = ('fullName', 'role', 'gradeLevel')
