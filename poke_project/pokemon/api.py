from pokemon.models import Pokemon
from accounts.models import PokemonMaster
from rest_framework import permissions, generics, viewsets
from .serializers import PokemonSerializer, AddPokemonSerializer, ReleasePokemonSerializer

# Pokemon Viewset
#get user pokemon
class GetUserPokemon(generics.ListAPIView):

    def get_queryset(self):
        pokemonmaster_id = self.kwargs.get(self.lookup_field)
        pokemon_master_obj = PokemonMaster.objects.filter(id = pokemonmaster_id)
        owned_pokemon = pokemon_master_obj.values_list('pokemon')
        queryset = Pokemon.objects.filter(id__in=owned_pokemon)
        # queryset = self.request.user.pokemons.all()
        return queryset

    serializer_class = PokemonSerializer
    permission_classes =[
       permissions.IsAuthenticated
    ]

#get user unowned pokemon
class GetUnownedPokemon(generics.ListAPIView):

    def get_queryset(self):
        pokemonmaster_id = self.kwargs.get(self.lookup_field)
        pokemon_master_obj = PokemonMaster.objects.filter(id = pokemonmaster_id)

        owned_pokemon = pokemon_master_obj.values_list('pokemon')
        # print('HEHHREHERHERH', (owned_pokemon))
    
        # queryset = Pokemon.objects.exclude(id__in=owned_pokemon)
        # print('HEHRJEHRH2UIOEHU1ROH31',queryset)
        # print('HEHRJEHRH2UIOEHU1ROH31',Pokemon.objects.all())
        # updated_q = Pokemon.objects.exclude(id__in=queryset.id)
        # pokemon_master_obj.pokemon = queryset
        # print('HEHRJEHRH2UIOEHU1ROH31',pokemon_master_obj)

        # print(owned_pokemon.first()[0])
        # print(bool(owned_pokemon.first()[0]))

        if bool(owned_pokemon.first()[0]): #if pokemon exists
            queryset = Pokemon.objects.exclude(id__in=owned_pokemon)
        else:
            queryset = Pokemon.objects.all()

        print(queryset)

        return queryset
        
    serializer_class = PokemonSerializer
    permission_classes =[
       permissions.IsAuthenticated
    ]

#get all pokemon
class GetAllPokemon(generics.ListAPIView):
    queryset = Pokemon.objects.all()
    permission_classes =[
       permissions.AllowAny
    ]
    serializer_class = PokemonSerializer

#add pokemon - {pokemon: [ {"id": ?, "name": ?}]}
class AddPokemon(generics.RetrieveUpdateAPIView): #update but increasing

    permission_classes =[
        permissions.IsAuthenticated
    ]

    queryset = PokemonMaster.objects.all()
    serializer_class = AddPokemonSerializer


#release pokemon
class ReleasePokemon(generics.RetrieveUpdateAPIView): #update but reducing
    permission_classes =[
       permissions.IsAuthenticated
    ]
    queryset = PokemonMaster.objects.all()
    serializer_class = ReleasePokemonSerializer


# class PokemonViewSet(viewsets.ViewSet):

#     def unownedpokemon(self, request):
#         queryset = Pokemon.objects.all()
#         serializer = PokemonSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def mypokemon(self, request):
#         queryset = Pokemon.objects.all()
#         serializer = PokemonSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def allpokemon(self, request):
#         queryset = Pokemon.objects.all()
#         serializer = PokemonSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def addpokemon(self, request):
#         queryset = Pokemon.objects.all()
#         serializer = PokemonSerializer(queryset, many=True)
#         return Response(serializer.data)

#     def releasepokemon(self, request):
#         queryset = Pokemon.objects.all()
#         serializer = PokemonSerializer(queryset, many=True)
#         return Response(serializer.data)


# class PokemonViewSet(viewsets.ModelViewSet):
#     queryset = Pokemon.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = PokemonSerializer

