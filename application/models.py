from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Location(models.Model):
    cost = models.FloatField()
    street_name = models.CharField(max_length=100)
    street_number = models.IntegerField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    description = models.CharField(max_length=100)
	
    def __str__(self):
        """String for representing the Model object."""
        return self.street_name + "," + str(self.street_number) + "," + str(self.longitude) + "," + str(self.latitude) + "," + str(self.cost) + "," + self.description

class Driver(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    mobile_phone = models.CharField(max_length=15)
	
	
    def __str__(self):
        """String for representing the Model object."""
        return self.first_name + " " + self.last_name + "," + self.mobile_phone;
	
class ParkingRequest(models.Model):
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    passenger = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
	
