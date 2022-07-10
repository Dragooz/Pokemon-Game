from django.urls import path, include
from .api import GetUnownedPokemon, GetUserPokemon, GetAllPokemon, AddPokemon, ReleasePokemon
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('pokemonmaster', PokemonMasterViewSet, basename='pokemonmaster')
# router.register('api/allpokemon/', GetAllPokemon, 'pokemon')

urlpatterns= [
    path('unownedpokemon/<int:pk>/', GetUnownedPokemon.as_view()),
    path('mypokemon/<int:pk>/', GetUserPokemon.as_view()),
    path('allpokemon/', GetAllPokemon.as_view()),
    path('addpokemon/<int:pk>/', AddPokemon.as_view()),
    path('releasepokemon/<int:pk>/', ReleasePokemon.as_view()),
    # path('', include(router.urls)),
]

 