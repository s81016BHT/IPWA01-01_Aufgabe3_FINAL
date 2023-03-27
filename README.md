# IPWA01-01_Aufgabe3_FINAL - Kleiderspenden

This is a university project for the IPWA01-01 course in the media informatics course at the IU - International University

## Instructions for initial Setup
### Dependencies
This project was build with node.js https://nodejs.org/en and consists of two parts. 

Frontend and Backend. In both folders ther lays a package.json with which you can install the needed
dependencies by using npm.

```
npm install
```

### Database
This project is based on a MySQL database. Please set up a database environment and import the spendenanmeldung.sql in **Backend/Database**
and then bind the database in DB.js under **Backend/Database/DB.js**

```javascript
DB.dbcon_pool = mysql.createPool({
                  host: "HOST_IP_ADDRESS",
                  user: "DB_USERNAME",
                  password: "DB_PASSWORD",
                  database: "DB_NAME"
                });


```

### SSL for local deployment
This project uses a webserver based on express and node-https. For this you have to provide a SSL certificate. You can generate 
a self-signed certificate by using openssl and following the instructions below! Run the command inside **Backend/SSL**

For usage of openssl, make shure you have installed openssl. See: https://github.com/openssl/openssl

```
-------------------------------------------------------------------------------------------------------------

  openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -keyout localhost.key -out localhost.crt

-------------------------------------------------------------------------------------------------------------

Source:
John, A. (2022, 16. Oktober). 
    Generate Self-Signed SSL certificate using OpenSSL in one line. Arul’s Utilities. 
    Abgerufen am 25. März 2023, von https://aruljohn.com/blog/self-signed-certificate
```

### Running the Server
run the server by running the following command in the Backend Folder

```
 node server.js
``` 

## Frontend

The frontend of the project was built using 

- Angular 15          --> https://angular.io/
- Tailwind CSS        --> https://tailwindcss.com/
- rxjs                --> https://rxjs.dev/
- angular-fontawesome --> https://fontawesome.com/v5/docs/web/use-with/angular
- socketio-client     --> https://socket.io/

and is located in the raw form under AngularProject. Before making any changes, make sure that all necessary dependencies are installed.

### Structure

The frontend folder structure consists of two parts. The static components Header and Footer are in the Components folder. The pages which are routed in the router module are located the Pages folder, such as a page for the imprint, privacy, landing-page and the registration-formular

## Backend

The backend of the project was built using 

- nodejs with node-http and node-https --> https://nodejs.org/api/http.html and https://nodejs.org/api/https.html
- express --> https://expressjs.com/de/
- socket.io --> https://socket.io/
- node-mysql --> https://github.com/mysqljs/mysql#install

### Structure
The Backend consists of 3 Folders. 

1. **Database Folder** contains **DB.js** for initializing the database communication and a **DB_RegistrationHandler.js** for executing commands based on registration forms datta input

2. **SSL Folder** contains the SSL certificate used for the deployment.

3. **Websocket folder** contains an **init_websocket.js** for socket.io initialization and a **registration_events.js** containing the socket.io events for the registration form

The server.js initializes the express app, the HTTP server to redirect to https, and the https server to serve the express app and the files contained in the distribution folder

## Communication Models

### Communication Methods Backend-Frontend

Various endpoints based on socket.io events are used to exchange data between the backend and frontend. The following table is intended to show how the backend reacts in the respective endpoints.

| Endpoint Backend  | Requests             | Response                             |Emits to Frontend |
| ------------------|----------------------|--------------------------------------|------------------|
| getClothes        |                      | List of clothes respone Object-Array |getClothes        |
| getAreas          |                      | List of areas respone Object-Array   |getAreas          | 
| addressValidation |Address-Object        | Address validation response Object   |addressValidation |
| newRegistration   |Registration-Object   | Registration respone Object          |registration      |
| getRegistration   |Search request Object | Registration respone Object          |registration      |


##### List of clothes respone Object-Array
```ts
{
  clothes: ChecklistItem-Object[]
}
```

##### List of areas respone Object-Array
```ts
{
  areas: ChecklistItem-Object[]
}
```

##### Registration respone Object
```ts
{
  registration: Registration-Object | null
}
```

##### Address validation response Object
```ts
{
  addressValid: Boolean
}
```

##### Search request Object 
```ts
{
  registrationId: Number
}
```

### General Objects

##### Registration-Object
```ts
{
  type: String,
  address: Address | null,
  clothes: String[],
  areas: String[],
  date ?: String,
  time ?: String,
  registrationId ?: String
}
```

##### Address-Object
```ts
{
  name: String,
  surname: String,
  street: String,
  number: Number,
  zipcode: Number,
  location: String
}
```

##### ChecklistItem-Object
```ts
{
  title: String,
  active: boolean
}
```


