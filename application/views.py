from django.shortcuts import render

# Create your views here.

def application(request):
     # Number of visits to this view, as counted in the session variable.
    num_visits=request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits+1

    return render(request, 'index.html', context={ 'num_visits': num_visits})