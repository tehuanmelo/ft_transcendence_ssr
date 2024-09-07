from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import render_to_string

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return render(request, 'pages/home.html')
    else:
        form = AuthenticationForm()

    return render(request, 'users/login.html', {'form': form})