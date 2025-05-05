from django.contrib import admin
from .models import(
            ResumeTemplate,
            UserResume
)

@admin.register(ResumeTemplate)
class ResumeTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_premium', 'thumbnail_preview')
    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        return obj.thumbnail.url if obj.thumbnail else ""
    thumbnail_preview.short_description = 'Thumbnail_preview'

@admin.register(UserResume)
class UserResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'template', 'created_at')
    list_filter = ('template', 'created_at')