# Project Description
This is a mockup of an online ordering website. This website provides secure registration and login for users. Only registered users are able to order products. Others will be redirected to the login page when attempting to access unauthorized pages. A logged-in user will be able to add, remove, and update their cart. DOM manipulation provides a seamless experience with no page refresh. All data are stored on a MySQL database and can be securely retrieved. Passwords are securely hashed by bCrypt and sessions allows the user and the cart to be temporarily saved without causing traffics to the database.

# Project Tree
* Public (Directory)
  * Fonts (Directory)
    * __Order Pizza.ttf__: Font used in website logo.
  * Images (Directory): Contains images used in seed data.
  * JavaScripts (directory):
    * __cart.js__: Javascript file for DOM manipulation using JQuery and communicating with Cart API using AXIOS.
    * __custom-pizza.js__: Javascript file for DOM manipulation using JQuery and communicating with Cart API using AXIOS.
    * __order.js__: Javascript file for DOM manipulation using JQuery and communicating with Cart API using AXIOS.
  * Stylesheets (Directory)
    * __style.css__: Style sheet used by the application. Generated automatically by Sass. Should not be edited.
    * __style.css.map__: Map file to convert SASS into CSS. Should not be edited.
    * __style.scss__: Sass file that should be edited.
* Routes (Directory)
  * API (Directory)
    * __cart.js__: This file manages the Cart API and is the destination for the /api/cart route.
    * __category.js__: This file manages the Category API and is the destination for the /api/category route.
  * User (Directory)
    * __login.js__: This file is the destination for the /login route. This file also authenticates user logins via post protocols and bCrypt hashing, cates to the database, and manages user sessions.
    * __register.js__: This file is the destination for the /register route. This file also registers new users, check for data input errors, and redirect to other routes correspondingly.
  * __index.js__: This file manages the /index route, the main route of the application. This means this file will redirect the user correspondingly based on their past and current inputs.
  * __order.js__: This file manages the /order route, one of the core component of the website. The order route allows user to order products. This file verify that a user is logged-in, communicates with the database, and displaying the data queried from the database correspondingly.
* Views (Directory)
  * Order (Directory)
    * __cart.pug__: This pug file renders the cart page where the logged-in user can see all the products that have been added to the cart. From here, the user can also update or remove products and see the updated total instantly.
    * __create.pug__: This pug file renders the pizza customization page where user can create their own custom pizza. From here, user can add the pizza to the cart.
    * __index.pug__: This pug file renders the main ordering page where all products are displayed along with their prices. From here, user can add products in the cart or choose to create a custom pizza.
  * User (Directory)
    * __login.pug__: This pug file renders the login page with a username input, a password input, and a login submit button.
    * __register.pug__: This pug file renders the registration page with required input fields.
  * __error.pug__: This file is a default file of the Express server to display errors when the server crashes.
  * __index.pug__: This file renders the default view of the application. It will display a landing page for all users, including non-registered users.
  * __layout.pug__: This file contains a template being used by other pug files. This template file includes the necessary bootstrap files.
* __create.sql__: This file contains SQL code to generate the required tables as well as the optional data the seed for a developing environment.
* __db.js__: This file connects to the remote database and allows the application to communicate with the remote database.
* __.env.template__: This file contains a template for administrator to create a _.env_ file required to run the application.


# To Run the Application
1. Copy the top section of the code from create.sql, labelled as "CREATE TABLES", and generate the required table in the mysql database.
2. (Optional) Copy the bottom section of the code from create.sql, labeled as "SEED TEST DATA", and seed the database with sample data.
3. Upon downloading, a few dependencies must be installed using _npm install_ command. See below for details.
4. Using an appropriate template from the __.env.template__ file, create a __.env__ file and fill in the information required to access the remote database.
5. Run the server.

# Dependencies
* Runtime dependencies
  * __MySQL__: This allows the server to connect to a remote MySQL database.
  * __DOTENV__: This allows database login information to remain localized, separated from the remote repository.
  * __bcrypt__: bCrypt allows easy encryption of user passwords.
  * __express-session__: This dependency allows the easy implementation of session cookies.
* Development dependencies
  * __Nodemon__: This development dependency detects changes and restart the server automatically.

# Preview
![A preview of the main page of the application.](https://farm2.staticflickr.com/1969/45526351154_636ceed0cb_h.jpg)

![Login page.](https://farm5.staticflickr.com/4890/45526349274_62471194a8_h.jpg)

![Registration page.](https://farm5.staticflickr.com/4837/45337164665_224bfddf7e_h.jpg)

![Main ordering page.](https://farm5.staticflickr.com/4869/45337164425_8c237b9689_h.jpg)

![Custom pizza building page.](https://farm5.staticflickr.com/4804/45337162625_752416d2b7_h.jpg)

![Cart page.](https://farm2.staticflickr.com/1925/45337162195_a215df61fe_h.jpg)