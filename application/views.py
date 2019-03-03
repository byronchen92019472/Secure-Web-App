from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.views import generic
import json
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.
from application.models import Location, Driver, ParkingRequest

def application(request):
     # Number of visits to this view, as counted in the session variable.
	
    
	
    try:
        locations = Location.objects.all()
    except Location.DoesNotExist:
        raise Http404('Locations not found')
    return render(request, 'index.html', {'locations': locations})






