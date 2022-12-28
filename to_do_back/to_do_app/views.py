from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from django.core import serializers
from datetime import date
import json
# Create your views here.
print(date.today())

def home(request):
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)


@api_view(['POST'])
def sign_up(request):
    try:
        AppUser.objects.create_user(name=request.data['name'], username=request.data['email'], password=request.data['password'], email=request.data['email'])
        return JsonResponse({'success':True})
    except Exception as e:
        print(str(e))
        return JsonResponse({'success':False})

@api_view(['POST'])
def log_in(request):
    email = request.data['email']
    password=request.data['password']
    user = authenticate(username= email, password = password)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
            except Exception as e:
                print(str(e))
            return JsonResponse({'success':True})
        else: 
            return JsonResponse({'success':False})
    else:
        return JsonResponse({'success':False})
    
@api_view(['POST'])
def log_out(request):
    logout(request)
    return HttpResponse('Logged Out')

@api_view(['GET'])                
def curr_user(request):
    if request.user.is_authenticated:
        data= serializers.serialize("json", [request.user], fields=['name', 'email', 'password'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})
    
    
@api_view(['GET', 'POST'])
def get_create_tasks(request):
    if request.method == "POST":
        try:
            title=""
            if(request.data['title']):
                title=request.data['title']
            description=""
            if(request.data['description']):
                description=request.data['description']
            mydate=date.today()
            if(request.data['date']):
                mydate=request.data['date']
            if title=="" and description=="":
                new_task=Task.objects.create(user=request.user, date=mydate)
            elif title== '':
                    new_task=Task.objects.create(description=description, date=mydate, user=request.user)
            elif description=='':
                new_task=Task.objects.create(title=title, date=mydate, user=request.user)
            else:
                new_task=Task.objects.create(title=title, description=description, date=mydate, user=request.user)
            new_task.save()
            return JsonResponse({'success':True})
        except Exception as e:
            print(e)
            return JsonResponse({'success':False})
        
    if request.method=="GET":
        try:
            my_tasks=list(Task.objects.filter(user=request.user).values())
            return JsonResponse({'tasks':my_tasks})
        except Exception as e:
            print(e)
            return JsonResponse({'tasks':[]})
        
api_view(["GET","PUT", "DELETE"])
def alter_a_task(request, id):
    try:
        selected_task=Task.objects.get(id=id, user=request.user)
        
        
        if request.method=="DELETE":
            try:
                selected_task.delete()
                return JsonResponse({"task_deleted":True})
            except Exception as e:
                print(e)
                return JsonResponse({"task_deleted":False})
            
            
        if request.method=="GET":
            try:
                selected_task=list(Task.objects.filter(id=id, user=request.user).values())[0]
                return JsonResponse({"task":selected_task})
            except Exception as e:
                print(e)
                return JsonResponse({"task":None})
            
            
        if request.method=="PUT":
            try:
                body=json.loads(request.body)
                title=body['title']
                description=body['description']
                mydate=body['date']
                selected_task.title=title
                selected_task.description=description
                selected_task.date=mydate
                selected_task.save()
                return JsonResponse({"update":True})
            except Exception as e:
                print(e)
                return JsonResponse({"update":False})
            
            
    except Exception as e:
        print(e)
        return JsonResponse({'error': e})
        
        