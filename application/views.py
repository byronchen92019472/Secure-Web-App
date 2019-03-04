from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404

# Create your views here.
from application.models import Location, Driver, ParkingRequest

def application(request):

    try:
        locations = Location.objects.all()
        drivers = Driver.objects.all()
    except Location.DoesNotExist:
        raise Http404('Locations not found')
    return render(request, 'index.html', {'locations': locations, 'drivers':drivers})