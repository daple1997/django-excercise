To use this app
1. run migrations:
   python manage.py makemigrations
   python manage.py migrate
2. run the server:
   python manage.py runserver
3. Test the API:
   curl -X POST http://127.0.0.1:8000/api/items/ -d '{"name": "Item 1", "description": "This is the first item."}' -H "Content-Type: application/json"
   //or PowerShell
   Invoke-RestMethod -Uri http://127.0.0.1:8000/api/items/ -Method POST -Body '{"name": "Item 1", "description": "This is the first item."}' -ContentType 'application/json'
