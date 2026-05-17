# shipments/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import (Shipment, ShipmentDestination)
from .serializers import( ShipmentSerializer, ShipmentDestinationSerializer)
from rest_framework.permissions import AllowAny, IsAuthenticated

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all().order_by("-created_at")
    serializer_class = ShipmentSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def track_shipment(request, tracking_number):

    shipment = Shipment.objects.filter(tracking_number=tracking_number) \
        .prefetch_related("destinations") \
        .first()
        
    if not shipment:
        return Response({"error": "Not found"}, status=404)
    
    serializer = ShipmentSerializer(shipment)
    return Response(serializer.data)
@permission_classes([IsAuthenticated])
class ShipmentDestinationViewSet(viewsets.ModelViewSet):
    queryset = ShipmentDestination.objects.all()
    serializer_class = ShipmentDestinationSerializer

