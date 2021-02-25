# eCannaB API

eCannab is not a ecommerce platform, is the v1 application created for CBD wholesale sellers looking to start their online business, in a simple and efficient way, by creating their own website, adding products and resources to it, and providing a registration system to their customers so that they can navigate privatly to see the resources, and add products to the cart. (Orders made by customers cooming soon)

As a user, you will have the option to:

- Register and Login.
- Create/Edit/Delete your site, with your own subdomain.
- Create/Edit/Delete/Add Products to your site.
- Create/Edit/Delete/Add Resources to your site.
- Have Customers that login on your site to be able to add products to register, login and add products to the cart.

### 1. Working Prototype (to do later)

You can access a working prototype of the React app here: https://ecannab-client.vercel.app/ and Node app here: https://ecannab-api.herokuapp.com/

### 2. User Stories

This app is for 4 types of users: a user=CBD Wholesale seller, and a logged-in user, a customer and a logged-in customer of that user in his site.

###### Landing Page (Importance - Low) (Est: 1h)

- as a visitor
- I want to understand what I can do with this app (or sign up, or log in)
- so I can decide if I want to use it.

###### Login Page / User and Customer (Importance - High) (Est: 3h)

- As a returning register user or customer
- I want to enter my password and email to use this app,
- So I can have access to my account.

###### Sign Up / User and Customer (Importance - High) (Est: 3h)

- As a visitor,
- I want to register to use this app
- So I can create a personal account.

###### Dashboard (Importance - High) (Est: 5h)

- As a logged-in user,
- I want to be able to preview the content of the app (Site Creation/ Resources / Products / Orders).
- So I can decide what section I want to navigate to.

###### SiteHome (Importance - High) (Est: 2h)

- As a customer visitor I can see the list of products, search and filter.
- As a logged-in customer I can add products to the cart and make orders.

### 3. Functionality (to do now)

The app's functionality includes:

- Every User has the ability to create an account and login.
- Every User has the ability to create/edit/delete a site.
- Every User has the ability to create/edit/delete products and adds it to a site.
- Every User has the ability to create/edit/delete products and adds it to a site.
- Every Customer in a User Site can create an account and login.
- Every Customer in a User Site has the ability to add products to the cart
- Every Customer has the ability to search products by title and more.

- Further implementation every customer will be able to make orders in a User Site.

### 4. Technology

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Development Environment: Heroku, DBeaver.

### 5. Wireframes (to do now)

(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing-page-wireframe.png)
Register Page
![Register Page](/github-images/wireframes/register-page-wireframe.png)

### 6. Back-end Structure - Business Objects

- Users (database table)

  - id (auto-generated)
  - username (email validation)
  - password (at least 8 chars, at least one alpha and a special character validation)

- Resources(database table)

  - id(auto-generated)
  - name (text not null)
  - link (text not null)
  - r_image(text not null)
  - site_id(foreign key)

- Sites (database table)

  - id (auto-generated)
  - brand (text not null)
  - logo (text not null)
  - seller_description (text not null)
  - subdomain (text not null)
  - resources (an array of id resources)
  - user_id(foreign key)

- Products (database table)

  - id (auto-generated)
  - title (text not null)
  - brand (text not null)
  - p_image (text not null)
  - price (decimal)
  - in_stock (integer)
  - p_description (text not null)
  - site_id(foreign key)

- Customers (database table)

  - id (auto-generated)
  - username (email validation)
  - password (at least 8 chars, at least one alpha and a special character validation)
  - site_id(foreign key)

- Orders (database table)

  - id (auto-generated)
  - total_paid
  - products (an array of the products ids )
  - customer_id(foreign key)

### 7. API Documentation (to do later)

#### API Overview

```
    /api
    .
    ├── /auth
    │   └── POST
    │       ├── /login
    ├── /users
    │   └── POST
    │       └── /
    ├── /s
    │   └── GET
    │       POST
    │       PUT
    │       DELETE
    │       └── /
    ├── /resources
    │   └── GET
    │       POST
    |       PUT
    |       DELETE
    │       └──/
    ├── /products
    │   └── GET
    │       POST
    │       PUT
    │       DELETE
    │       └── /
    ├── /authcustomer
    │   └── POST
    │       ├── /login
    ├── /customers
    │   └── POST
    │       └── /
```

##### POST `/api/auth/login`

```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "Password1"
    }

    // res.body
    {
    "authToken": String,
        "userId": 1
    }
```

##### POST `/api/users/`

```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "123456"
    }


    // res.body
    {
        "id": 1,
        "user_name": "demo@gmail.com"
    }
```

### 9. Screenshots

(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page-screenshot.png)
Register Page
![Register Page](/github-images/screenshots/register-page-screenshot.png)

### 10. How to run it (done)

Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test

##### Local Node scripts

- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test
