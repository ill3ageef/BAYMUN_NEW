from django.contrib import admin
from .models import UserInfo

@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'fullName', 'role', 'email', 'gradeLevel', 'school', 'phone', 'padded_id', 'has_payed')
    list_filter = ('role', 'gradeLevel', 'school','has_payed')
    list_editable = ("has_payed",)
    
    search_fields = ('has_payed','id','fullName', 'email', 'phone', 'cpr')

    ordering = ('fullName', 'role', 'gradeLevel')
