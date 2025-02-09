from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import Notes
from .serializers import NoteSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])   # Only logged-in user can access
def getNotes(request):
    user = request.user  # Populated by the authentication class
    notes = user.notes_set.all()  # Query notes for the authenticated user
    notes_serializer = NoteSerializer(notes, many=True)
    return Response(notes_serializer.data)







