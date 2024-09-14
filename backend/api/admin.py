from django.contrib import admin
from .models import UserInfo

@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'fullName', 'role', 'email', 'gradeLevel', 'school', 'phone', 'cpr', 'padded_id', 'display_additional_data')
    
    list_filter = ('role', 'gradeLevel', 'school')
    fields = ('fullName', 'role', 'email', 'gradeLevel', 'school', 'phone', 'cpr', 'padded_id')
    
    search_fields = ('fullName', 'email', 'phone', 'cpr')
    
    def display_additional_data(self, obj):
        return ', '.join([f'{key}: {value}' for key, value in obj.additional_data.items()])
    
    display_additional_data.short_description = 'Additional Info'

    ordering = ('fullName', 'role', 'gradeLevel')