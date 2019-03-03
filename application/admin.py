from django.contrib import admin
from application.models import Location, Driver, ParkingRequest

# Register your models here.
admin.site.register(Location)
admin.site.register(Driver)
admin.site.register(ParkingRequest)