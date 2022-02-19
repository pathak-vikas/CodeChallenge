from django.contrib import admin

from .models import (
    Restaurant,
    Item,
    Order,
    OrderItem
)

admin.site.register(Restaurant)
admin.site.register(Item)
admin.site.register(Order)
admin.site.register(OrderItem)
