# restaurant-api
## To run this project
Clone the source code and install package by ( npm install ) into home directory. Then ( npm start ) to run the project.
There are no need to database connection. Because I have link database on mongodb atlas

## To check api into postman
### For register user (name, email, password, cpassword): POST method
localhost:5000/api/users/register
### For login (email and password): POST method and you will get web-token
localhost:5000/api/users/login
### For geting user details: GET method and authentication required
localhost:5000/api/users/detatails/{id}
### For geting all user : GET method and authentication required
localhost:5000/api/users/allUser
### For updating User: POST method and authentication required
localhost:5000/api/users/update/{id}
### For deleting user: DELETE method and authentication required 
localhost:5000/api/users/delete/{id}

### For adding menu item (name): POST method
localhost:5000/api/menuItems/newItem
### For geting all menu item: GET method
localhost:5000/api/menuItems/allItem
### For updating menu item: POST method
localhost:5000/api/menuItems/update/{id}
### For deleting menu Item: DELETE method
localhost:5000/api/menuItems/delete/{id}

### For Ordering ({menuItems:id and address}): POST method and authentication required 
localhost:5000/api/orders/newOrder
### For geting all Order: GET method and authentication required 
localhost:5000/api/orders/allOrder
### For updating order: POST method and authentication required 
localhost:5000/api/orders/update/{id}
### For deleting Order: DELETE method and authentication required 
localhost:5000/api/orders/delete/{id}
