from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer



# api endpoints


@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    deserailized_data = BookSerializer(books,many=True)
    return Response(deserailized_data.data)


@api_view(['POST'])
def create_books(request):
    accessing_frontenddata = request.data
    serailized_data = BookSerializer(data=accessing_frontenddata)
    if serailized_data.is_valid():
        serailized_data.save()
        # return JsonResponse(serailized_data.data,status =status.HTTP_200_OK)
        return Response(serailized_data.data, status=status.HTTP_201_CREATED)

    return Response(serailized_data.errors,status = status.HTTP_400_BAD_REQUEST)



@api_view(['PUT','DELETE'])
def book_detail(request,pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        book.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
        
        
    elif request.method == 'PUT':
        data = request.data
        serializer = BookSerializer(book,data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        
        
            
            
        
        
    
    
    
    
    
    
    
    
        
    





    
    
    


