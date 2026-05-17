# shipments/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ShipmentViewSet, track_shipment, ShipmentDestinationViewSet)

router = DefaultRouter()
router.register("shipments", ShipmentViewSet, basename="shipments")
router.register("destinations", ShipmentDestinationViewSet, basename="destinations")

urlpatterns = [
    path("", include(router.urls)),
    path("track/<str:tracking_number>/", track_shipment),
]
