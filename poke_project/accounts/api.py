from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import PokemonMasterSerializer, RegisterSerializer, LoginSerializer

# #Register API
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user": PokemonMasterSerializer(user, context=self.get_serializer_context()).data,
#             "token": 
#         })

#Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": PokemonMasterSerializer(user, context=self.get_serializer_context()).data,
        })

#Getuser