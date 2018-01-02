from django.shortcuts import render
from ..methods import generate_session_id

# Create your views here.

def index(request):

    response = render(request, 'app/index.html', {})

    '''
    Set cookies only if no previous cookie was set
    '''
    if "player_session_id" not in request.COOKIES:
        print("New user. Updating cookie")
        response.set_cookie("player_session_id", generate_session_id())

    return response 
