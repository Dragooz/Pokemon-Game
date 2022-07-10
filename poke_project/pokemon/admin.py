from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Pokemon
from accounts.models import PokemonMaster

# Register your models here.

@admin.register(Pokemon)
class UniversalAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in self.model._meta.concrete_fields]

class PokemonMasterAdmin(UserAdmin):
    list_display = (
        'username', 'email', 'first_name', 'last_name', 'is_staff',
        'get_pokemon',
        )

    fieldsets = UserAdmin.fieldsets + (
        ('Pokemon List', {'fields': ('pokemon',)}),
    )
    pass

admin.site.register(PokemonMaster, PokemonMasterAdmin)


#bridge
# class PokemonCollectionInline(admin.TabularInline):
#     model = PokemonCollection
#     extra = 3

# class PokemonMasterAdmin(admin.ModelAdmin):
#     inlines = (PokemonCollectionInline,)

# admin.site.register(PokemonMaster, PokemonMasterAdmin)