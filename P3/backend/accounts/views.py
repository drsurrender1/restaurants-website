from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import CreateAPIView, get_object_or_404, \
    RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from rest_framework import status
from django.http import QueryDict
from django.utils.datastructures import MultiValueDict
from urllib.parse import urlencode


# Create your views here.
from accounts.models import User
from accounts.serializers import UserSerializer
from restaurant.models import Restaurant


class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return Response({})

    def post(self, request, *args, **kwargs):
        print("herefromdjango")
        # print(f"args={args}")
        # print(f"kwargs={kwargs}")
        print(f"request.body={request.body}")
        print(f"request.data={request.data}")
        if type(request.data) == QueryDict:
            return super().post(request, *args, **kwargs)
        else:
            data = json.loads(request.body)
            print(f"data={data}, type={type(data)}")
            print(f"request.body={request.body}")
        
        # print(f"request={request}")
        # print(urlencode(data))
        # query_dict=QueryDict(urlencode(data), mutable='False')
        # for key, value in data.items():
        #     d = {key: value}
        #     query_dict.update(MultiValueDict(d) if isinstance(value, list) else d)
        # for key, value in query_dict.items():
        #     if key:
        #         query_dict[key] = value[0]
        # print(query_dict)
        # request._full_data = query_dict
        # print('here4')
        #print(f"request.data={request.data}, type={type(request.data)}")
            print("here")
            return self.create(data, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UpdateUserView(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        id = self.request.user.id
        return get_object_or_404(User, id=id)

