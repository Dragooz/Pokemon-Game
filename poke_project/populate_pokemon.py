import django

import sys,os

pokemon_csv_path="pokemon.csv"
# Full path to the directory immediately above your django project directory
djangoproject_home="D:\Career Stuff\Reluvate\Frontend + Backend Assessment\Django Proj"
############ All you need to modify is above ############

sys.path.append(djangoproject_home)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'poke_project.settings')
django.setup()

from pokemon.models import Pokemon
import csv

dataReader = csv.reader(open(pokemon_csv_path), delimiter=',', quotechar='"')

for row in dataReader:
    pokemon = Pokemon()
    pokemon.name = row[0]
    pokemon.hp = row[1]
    pokemon.attack = row[2]
    pokemon.defense = row[3]
    pokemon.type_ = row[4]
    pokemon.save()

print('Done loading to database!')

