from django.db import models
from pokemon.models import Pokemon
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

#custom user
class PokemonMaster(AbstractUser):
    pokemon = models.ManyToManyField(Pokemon, blank=True) #after declaring this object, can use .add method

    def __str__(self):
        return self.username

    def get_pokemon(self):
        # return "\n".join( p.name for p in self.pokemon.all() )
        return [ [p.id, p.name] for p in self.pokemon.all() ]

class PokemonMasterManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        extra_fields.setdefault('is_active', True)
        super().create_user(self)

#     def create_superuser(self, email, password, **extra_fields):
#         """
#         Create and save a SuperUser with the given email and password.
#         """
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))
#         return self.create_user(email, password, **extra_fields)