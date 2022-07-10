from django.db import models

# To store pokemon
class Pokemon(models.Model):

    name = models.CharField(max_length=100, unique=True)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type_of_pokemon = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name



#To extend user to keep track pokemon
# class PokemonMaster(AbstractUser):

#     #Return pokemon owned by user
#     # class UserPokemon(models.Manager):
#     #     def get_queryset(self):
#     #         return super().get_queryset().filter(?)

#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     #this can be used to identify owned pokemon.
#     #then unowned can use reverse of this. 
#     #then all pokemon just return the master database.
#     #add pokemon just add in here.
#     #delete pokemon just delete here. 
#     pokemon_owned = models.ManyToManyField(Pokemon) #after declaring this object, can use .add method

    
#     def __str__(self):
#         return self.user.username



#APPENDIX

# @receiver(post_save, sender=User)
# def update_profile_signal(sender, instance, created, **kwargs):
#     if created:
#         PokemonMaster.objects.create(user=instance)
#     instance.pokemonmaster.save()



# #bridge
# class PokemonCollection(models.Model):
#     pokemon_name = models.CharField(max_length=100)
#     pokemon_master = models.ForeignKey(PokemonMaster, on_delete=models.CASCADE)
#     pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
