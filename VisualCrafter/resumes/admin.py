from django.contrib import admin
from django.utils.html import format_html
from .models import(
            ResumeTemplate,
            UserResume
)

@admin.register(ResumeTemplate)
class ResumeTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_premium', 'thumbnail_preview')
    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" width="100" />', obj.thumbnail.url)
        return ""
    thumbnail_preview.allow_tags = True

@admin.register(UserResume)
class UserResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'template', 'created_at')
    list_filter = ('template', 'created_at')