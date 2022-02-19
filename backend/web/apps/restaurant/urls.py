from django.contrib import admin
from django.urls import path

from restaurant.views import (
    index,
    ItemsView,
    SaveOrdersView,
    RecentView,
    MostPurchasedView
)

urlpatterns = [
    path('', index),
    path('api/items/', ItemsView.as_view()),
    path('api/recent/', RecentView.as_view()),
    path('api/saveorders/', SaveOrdersView.as_view()),
    path('api/mostpurchased/', MostPurchasedView.as_view()),
]
