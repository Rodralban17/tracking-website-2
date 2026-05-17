# shipments/serializers.py
from rest_framework import serializers
from .models import Shipment, ShipmentDestination

class ShipmentDestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentDestination
        fields = "__all__"

class ShipmentSerializer(serializers.ModelSerializer):
    
    # This remains for your destinations
    destinations = ShipmentDestinationSerializer(many=True, read_only=True)

    class Meta:
        model = Shipment
        fields = "__all__"