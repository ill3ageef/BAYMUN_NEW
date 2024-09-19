from django.contrib import admin
from .models import UserInfo

@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):

    def baymun_id(self, obj):
        return f"BAYMUN2411{obj.id:04d}"

    baymun_id.short_description = "ID"

    list_display = ('baymun_id', 'fullName', 'role', 'email', 'gradeLevel', 'school', 'phone', 'has_payed')
    list_filter = ('role', 'gradeLevel', 'school')
    list_editable = ("has_payed",)
    
    search_fields = ('fullName', 'email', 'phone', 'cpr')

    ordering = ('fullName', 'role', 'gradeLevel')