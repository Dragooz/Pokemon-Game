from django.urls import path, include
from .api import LoginAPI

urlpatterns= [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/login/', LoginAPI.as_view()),
]

 