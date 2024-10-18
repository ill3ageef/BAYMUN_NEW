import csv
from django.contrib import admin
from django.http import HttpResponse
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserInfo, User


SCHOOL_NAME_REPLACEMENTS = {
        "AKIS": "ARKIS",
    }


class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"


class CustomSchoolFilter(admin.SimpleListFilter):
    title = 'School'
    parameter_name = 'school'

    

    def lookups(self, request, model_admin):
        schools = set(UserInfo.objects.values_list('school', flat=True))
        return [(school, SCHOOL_NAME_REPLACEMENTS.get(school, school)) for school in schools]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(school=self.value())
        return queryset


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser')
    ordering = ('id', 'email')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )

@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin, ExportCsvMixin):

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        user = request.user
        filters = []
        if user.has_perm('api.can_view_delegate'):
            filters.append('Delegate')
        if user.has_perm('api.can_view_chair'):
            filters.append('Chair')
        if user.has_perm('api.can_view_security'):
            filters.append('Security')
        if user.has_perm('api.can_view_press'):
            filters.append('Press')
        if user.has_perm('api.can_view_runner'):
            filters.append('Runner')
        if filters:
            return qs.filter(role__in=filters)
        return qs.none()

    def has_change_permission(self, request, obj=None):
        user = request.user
        if user.is_superuser:
            return True
        if obj is not None:
            if user.has_perm('api.can_edit_delegate') and obj.role == 'Delegate':
                return True
            if user.has_perm('api.can_edit_chair') and obj.role == 'Chair':
                return True
            if user.has_perm('api.can_edit_security') and obj.role == 'Security':
                return True
            if user.has_perm('api.can_edit_press') and obj.role == 'Press':
                return True
            if user.has_perm('api.can_edit_runner') and obj.role == 'Press':
                return True
        return False

    def has_add_permission(self, request):
        user = request.user
        return user.is_superuser or user.has_perm('api.can_add_userinfo')

    def has_delete_permission(self, request, obj=None):
        user = request.user
        if user.is_superuser:
            return True
        if obj is not None:
            if user.has_perm('api.can_delete_delegate') and obj.role == 'Delegate':
                return True
            if user.has_perm('api.can_delete_chair') and obj.role == 'Chair':
                return True
            if user.has_perm('api.can_delete_security') and obj.role == 'Security':
                return True
            if user.has_perm('api.can_delete_press') and obj.role == 'Press':
                return True
            if user.has_perm('api.can_delete_runner') and obj.role == 'Press':
                return True
        return False
    

    def baymun_id(self, obj):
        return f"BAYMUN2411{obj.id:04d}"
    
    def council_language(self, obj):
        if obj.role == 'Chair' and 'cha_3' in obj.additional_data:
            return obj.additional_data.get('cha_3')
        if obj.role == 'Delegate' and 'del_5' in obj.additional_data:
            return obj.additional_data.get('del_5')
        return ''
    
    
    
    def school_changed(self, obj):
        return SCHOOL_NAME_REPLACEMENTS.get(obj.school, obj.school)
    

    baymun_id.short_description = "Trans. ID"
    council_language.short_description = "Council Lang."
    school_changed.short_description = "School"

    list_display = ('id', 'baymun_id', 'fullName', 'role', 'email', 'gradeLevel', 'school_changed', 'phone', 'council_language', 'has_payed')
    list_filter = ('role', 'gradeLevel', CustomSchoolFilter)
    list_editable = ("has_payed",)

    actions = ["export_as_csv"]
    
    search_fields = ('has_payed','fullName', 'email', 'phone', 'cpr')

    ordering = ('id','fullName', 'role', 'gradeLevel')

admin.site.site_header = "BayMUN XVII Admin"