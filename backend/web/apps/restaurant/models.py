from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.name  

class Item(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    price = models.FloatField(default=0.0, blank=False, null=False)
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=False)
    updated_at = models.DateTimeField(auto_now=False)
    def __str__(self):
        return self.name

class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.id)

class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE,related_name='order_items')
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    def __str__(self):
        return self.item.name
