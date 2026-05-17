# shipments/models.py
import uuid
from django.db import models

def generate_tracking_number():
    return f"DCL-{uuid.uuid4().hex[:10].upper()}"
        
class Shipment(models.Model):

    # =========================
    # Seller and Receiver
    # =========================
    seller_name = models.CharField(max_length=255)
    seller_location = models.CharField(max_length=255)
    seller_email = models.EmailField()
    seller_phone = models.CharField(max_length=30)
    seller_address = models.TextField()

    receiver_name = models.CharField(max_length=255)
    receiver_location = models.CharField(max_length=255)
    receiver_email = models.EmailField()
    receiver_phone = models.CharField(max_length=30)
    receiver_address = models.TextField()
    # =========================
    # IDENTIFICATION
    # =========================
    tracking_number = models.CharField(
        max_length=50,
        unique=True,
        default=generate_tracking_number,
        editable=False
    )

    # =========================
    # PACKAGE INFO
    # =========================
    origin = models.CharField(max_length=255,null=True, blank=True)
    destination = models.CharField(max_length=255,null=True, blank=True)
    type_shipment = models.CharField(max_length=255,null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    package_number = models.IntegerField(null=True, blank=True)
    product_description = models.TextField(null=True, blank=True)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    carrier = models.CharField(max_length=255, null=True, blank=True)
    courier = models.CharField(max_length=255, null=True, blank=True)
    carrier_reference_number = models.CharField(max_length=255, null=True, blank=True)
    shipment_type = models.CharField(
        max_length=20,
        null=True, blank=True
    )
    status = models.CharField(
        max_length=20,
        default="PENDING"
    )
    payment_method = models.CharField(
        max_length=20,
        null=True, blank=True
    )
    total_cost = models.DecimalField(max_digits=12, decimal_places=2,null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    # =========================
    # DATES
    # =========================
    expected_delivery_date = models.DateField(null=True, blank=True)

    pickup_day = models.CharField(max_length=255, null=True, blank=True)
    pickup_time = models.CharField(max_length=255, null=True, blank=True)
    departure_time = models.CharField(max_length=255, null=True, blank=True)

    # =========================
    # EXTRA
    # =========================
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tracking_number} → {self.receiver_name}"

# shipments/models.py
class ShipmentDestination(models.Model):
    shipment = models.ForeignKey(Shipment, related_name="destinations", on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    gps = models.CharField(max_length=50, blank=True, null=True)
    arrived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255,null=True, blank=True)
    remarks = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.address} ({self.shipment.tracking_number})"

