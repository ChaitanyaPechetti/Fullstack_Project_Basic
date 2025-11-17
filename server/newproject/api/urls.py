from django.urls import path
from . import views

urlpatterns = [
    path("books/",views.get_books,name='get_books'),
    path('books/create/',views.create_books, name="create_books"),
    path('books/<int:pk>',views.book_detail,name='book_detail'),
    
   
    
    
]
