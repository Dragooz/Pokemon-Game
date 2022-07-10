from rest_framework import serializers
from pokemon.models import Pokemon
from accounts.models import PokemonMaster

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ('id', 'name', 'hp', 'attack', 'defense')
        extra_kwargs = {
            'name': {'validators': []},
            'hp': {'validators': []},
            'attack': {'validators': []},
            'defense': {'validators': []},
        }

class AddPokemonSerializer(serializers.ModelSerializer):
    pokemon = PokemonSerializer(many=True, read_only=False)
    class Meta:
        model = PokemonMaster
        # read_only_fields = ('id', 'username', 'email', 'password')
        fields = ('pokemon',)
        depth = 1

    #instance = current user, validated_data = new pokemon.
    def update(self, instance, validated_data):
        # print('VALIDATED_DATA: ',validated_data)
        pokemons_data = validated_data.pop('pokemon')
        # print('POKEMON DATA: ', pokemons_data)
        # instance = super(PokemonSerializer, self).update(instance, validated_data)
        for pokemon_data in pokemons_data:
            # print('aslkdjakljdslkajsklajl', list(pokemon_data.items()))
            new_poke = Pokemon.objects.filter(name=list(pokemon_data.items())[0][1])
            instance.pokemon.add(new_poke.first())

        instance.save()
        return super().update(instance, validated_data)

class ReleasePokemonSerializer(serializers.ModelSerializer):
    pokemon = PokemonSerializer(many=True, read_only=False)
    class Meta:
        model = PokemonMaster
        # read_only_fields = ('id', 'username', 'email', 'password')
        fields = ('pokemon',)
        depth = 1

    def update(self, instance, validated_data):
        pokemons_data = validated_data.pop('pokemon')
        # instance = super(PokemonSerializer, self).update(instance, validated_data)
        for pokemon_data in pokemons_data:
            # print('aslkdjakljdslkajsklajl', list(pokemon_data.items()))
            new_poke = Pokemon.objects.filter(name=list(pokemon_data.items())[0][1])
            instance.pokemon.remove(new_poke.first())

        instance.save()
        # print('AJKHKJFJALKSDJKLAJSD', instance.get_pokemon())
        return super().update(instance, validated_data)

#APPENDIX

# class PokemonMasterSerializer(serializers.ModelSerializer):
#     pokemon_owned = PokemonSerializer(many=True, read_only=False)

#     class Meta:
#         model = PokemonMaster
#         fields = ('id', 'pokemon_owned')

#     def update(self, instance, validated_data):
#         pokemons_data = validated_data.pop('pokemon_owned')
#         instance = super(PokemonMasterSerializer, self).update(instance, validated_data)

#         for pokemon_data in pokemons_data:
#             pokemon_qs = Pokemon.objects.filter(name__iexact=pokemon_data['name'])

#             if pokemon_qs.exists():
#                 pokemon = pokemon_qs.first()
#             else:
#                 pokemon = Pokemon.objects.create(**pokemon_data)

#             instance.pokemon_owned.add(pokemon)

#         return instance 


# class PokemonCollectionSerializer(serializers.ModelSerializer):
#     # pokemon = PokemonSerializer(many=True)
#     # pokemon_master = PokemonMasterSerializer(many=True)

#     class Meta:
#         model = PokemonCollection
#         fields = '__all__'
#         depth = 1