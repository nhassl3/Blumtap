# -*- coding: utf-8 -*-
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from secrets import token_urlsafe

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            password = token_urlsafe(15)
            user = User.objects.create_user(
                username=data.get('username'),
                password=password,
            )
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({"token": str(token), "password": password, 'id': user.pk}, status=201)
        except IntegrityError:
            return JsonResponse({
                "error": "Выбарнное имя занято. Пожалуйста, выберите другое имя пользователя",
            }, status=400)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(
            request=request,
            username=data.get('username'),
            password=data.get('password'),
        )
        if user is None:
            return JsonResponse(
                {'error': "Невозможно авторизоваться. Проверьте имя пользователя или пароль"},
                status=400
            )
        try:
            token = Token.objects.get(user=user)
        except:
            token = Token.objects.create(user=user)
        return JsonResponse({"token": str(token), 'id': user.pk}, status=201)


# TODO: При связке с frontend нужно сделать так, чтобы у того, пользователя, у которого есть статус админа (покупателя),
# TODO: работал сервис.
