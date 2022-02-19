from django.shortcuts import render, reverse, redirect
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from restaurant.models import Item, Order, OrderItem
import json
import datetime
from django.utils import timezone

def index(request):
    return HttpResponse("API V3")

class RecentView(APIView):
    '''
    This API call returns the recent  items. 
    '''

    
    def compute(self, x):
        if OrderItem.objects.filter(item=x).exists():
            return OrderItem.objects.filter(item=x).last().quantity  
        else:
            return 0 

    def get(self,request):
        queryType = request.GET.get('queryType')
        page = request.GET.get('page')
        q = request.GET.get('q')
        item_set =[]
        if q == '':
            item_set = Item.objects.all()
        else:
            item_set = Item.objects.filter(name__icontains=q)


        if queryType == "r":

            data = [
                {
                    "quantity":self.compute(x),
                    "trending":x.updated_at.replace(tzinfo=None) + datetime.timedelta(hours=16) < datetime.datetime.now().replace(tzinfo=None) ,
                    "count":x.count,
                    "updated_at":x.updated_at,
                    "id":x.id,"name":x.name,
                    "price":x.price, 
                    "restaurant":x.restaurant.name
                } for x in item_set.order_by('updated_at')[::-1]]  
            

        else:
            data = [{"quantity":self.compute(x),"trending":x.updated_at.replace(tzinfo=None) + datetime.timedelta(hours=16) < datetime.datetime.now().replace(tzinfo=None) ,"count":x.count,"updated_at":x.updated_at,"id":x.id,"name":x.name,"price":x.price, "restaurant":x.restaurant.name} for x in item_set.order_by('updated_at')[::-1]]
        

        return Response(data[int(page):int(page)+30])

class MostPurchasedView(APIView):
    '''
    This API call returns the most purchased items. 
    '''

    def compute(self, x):
        if OrderItem.objects.filter(item=x).exists():
            return OrderItem.objects.filter(item=x).last().quantity  
        else:
            return 0 

    def get(self,request):
        queryType = request.GET.get('queryType')
        page = request.GET.get('page')
        q = request.GET.get('q')
        item_set =[]
        if q == '':
            item_set = Item.objects.all()
        else:
            item_set = Item.objects.filter(name__icontains=q)

        if queryType == "r":
            data = [
                {
                    "quantity":self.compute(x),
                    "trending":x.updated_at.replace(tzinfo=None) + datetime.timedelta(hours=16) < datetime.datetime.now().replace(tzinfo=None) ,
                    "count":x.count,
                    "updated_at":x.updated_at,
                    "id":x.id,"name":x.name,
                    "price":x.price, 
                    "restaurant":x.restaurant.name
                } for x in item_set.order_by('count')[::-1]]        
            
        else:
            data = [{"quantity":self.compute(x),"trending":x.updated_at.replace(tzinfo=None) + datetime.timedelta(hours=16) < datetime.datetime.now().replace(tzinfo=None) ,"count":x.count,"updated_at":x.updated_at,"id":x.id,"name":x.name,"price":x.price, "restaurant":x.restaurant.name} for x in item_set.order_by('count')[::-1]]
            
        return Response(data[int(page):int(page)+30])



class ItemsView(APIView):
    '''
    This API call returns the items. 
    '''

    def get(self,request):
        page = request.GET.get('page')
        q = request.GET.get('q')
        if q != '':
            data = [{"id":x.id,"name":x.name,"price":x.price, "restaurant":x.restaurant.name} for x in Item.objects.filter(name__icontains=q)]
        else:
            data = [{"id":x.id,"name":x.name,"price":x.price, "restaurant":x.restaurant.name} for x in Item.objects.all()]
        return Response(data[int(page):int(page)+30])


class SaveOrdersView(APIView):
    '''
    This API call returns the saved orders. 
    '''
    def post(self,request):
        orders = json.loads(request.data.get("orders"))
        order_obj = Order()
        order_obj.save()
        for order in orders:
            item_obj = Item.objects.get(id=order['id'])
            item_obj.count = item_obj.count + float(order['quantity'])
            item_obj.save()
            order_item_obj = OrderItem()
            order_item_obj.order = order_obj
            order_item_obj.item = item_obj
            order_item_obj.quantity = float(order['quantity'])
            order_item_obj.save()
        return Response({})