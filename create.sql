/* CREATE TABLES */

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT,
    user VARCHAR(32) NOT NULL,
    pass CHAR(60) NOT NULL,
    email VARCHAR(128) NOT NULL,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    phoneNumber VARCHAR(10),
    memberSince DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_customers PRIMARY KEY (id)
);

CREATE TABLE addresses (
    id INT UNSIGNED AUTO_INCREMENT,
    customerId INT UNSIGNED,
    address VARCHAR(64) NOT NULL,
    city VARCHAR(32) NOT NULL,
    state VARCHAR(32) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    CONSTRAINT pk_addr PRIMARY KEY (id),
    CONSTRAINT fk_cust_id FOREIGN KEY (customerId) REFERENCES customers(id)
);

CREATE TABLE defaultAddress (
    id INT UNSIGNED AUTO_INCREMENT,
    customerId INT UNSIGNED,
    addressId INT UNSIGNED,
    CONSTRAINT pk_default_addr PRIMARY KEY (id),
    CONSTRAINT fk_def_addr_cust_id FOREIGN KEY (customerId) REFERENCES customers(id),
    CONSTRAINT fk_addr_id FOREIGN KEY (addressId) REFERENCES addresses(id)
);

CREATE TABLE category (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(32),
    CONSTRAINT pk_cat PRIMARY KEY (id)
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    description TEXT,
    price DOUBLE(16,2) DEFAULT 0.0,
    category INT UNSIGNED,
    picture VARCHAR(128),
    CONSTRAINT pk_products PRIMARY KEY (id),
    CONSTRAINT fk_cat_id FOREIGN KEY (category) REFERENCES category(id)
);

CREATE TABLE customizationCategories (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    multiple BOOLEAN NOT NULL,
    CONSTRAINT cust_cat PRIMARY KEY (id)
);

CREATE TABLE productCustomizations (
    id INT UNSIGNED AUTO_INCREMENT,
    product INT UNSIGNED,
    customizationCategories INT UNSIGNED,
    CONSTRAINT pk_prod_cust PRIMARY KEY (id),
    CONSTRAINT fp_prod_id FOREIGN KEY (product) REFERENCES products(id),
    CONSTRAINT fp_cust_cat FOREIGN KEY (customizationCategories) REFERENCES customizationCategories(id)
);

CREATE TABLE customizations (
    id INT UNSIGNED AUTO_INCREMENT,
    value VARCHAR(32) NOT NULL,
    custCatId INT UNSIGNED,
    CONSTRAINT pk_customizations PRIMARY KEY (id),
    CONSTRAINT fp_cust_cat_id FOREIGN KEY (custCatId) REFERENCES customizationCategories(id)
);

CREATE TABLE customPizza (
    id INT UNSIGNED AUTO_INCREMENT,
    customer INT UNSIGNED NOT NULL,
    CONSTRAINT pk_custom_pizza PRIMARY KEY (id),
    CONSTRAINT fk_custom_pizza_customer FOREIGN KEY (customer) REFERENCES customers(id)
);

CREATE TABLE customPizzaCustomization (
    id INT UNSIGNED AUTO_INCREMENT,
    customization INT UNSIGNED,
    CONSTRAINT pk_custom_pizza_customization PRIMARY KEY (id),
    CONSTRAINT fk_custom_pizza_customization FOREIGN KEY (customization) REFERENCES customizations(id)
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT,
    customerId INT UNSIGNED,
    timeOrdered DATETIME DEFAULT CURRENT_TIMESTAMP,
    deliveryAddress INT UNSIGNED,
    CONSTRAINT pk_order PRIMARY KEY (id),
    CONSTRAINT pk_order_cust_id FOREIGN KEY (customerId) REFERENCES customers(id),
    CONSTRAINT fk_order_addr_id FOREIGN KEY (deliveryAddress) REFERENCES addresses(id)
);

CREATE TABLE orderLine (
    id INT UNSIGNED AUTO_INCREMENT,
    orderId INT UNSIGNED,
    productId INT UNSIGNED,
    quantity INT,
    price DOUBLE(16,2) DEFAULT 0.0,
    CONSTRAINT pk_orderline_id PRIMARY KEY (id),
    CONSTRAINT fk_order_id FOREIGN KEY (orderId) REFERENCES orders(id),
    CONSTRAINT fk_product_id FOREIGN KEY (productId) REFERENCES products(id)
);

/* SEED TEST DATA */

/* CATEGORIES */
INSERT INTO `category`(`name`) VALUES ('Pizza');
INSERT INTO `category`(`name`) VALUES ('Sandwiches');
INSERT INTO `category`(`name`) VALUES ('Pasta');
INSERT INTO `category`(`name`) VALUES ('Sides');
INSERT INTO `category`(`name`) VALUES ('Desserts');
INSERT INTO `category`(`name`) VALUES ('Drinks');

/* PRODUCTS FOR PIZZA */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Philly Cheese Steak', 'Delicious pizza with philly steak and cheese!', 10.99, 1, 'philly.png');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('No Meat Veggie', 'Pizza with only veggie duh!', 12.99, 1, 'veggie.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Just Pepperoni', 'Pepperoni and nothing else!', 5.99, 1, 'pep.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Valentine Special', 'Nothing else says "I love you" more than a heart-shaped pizza!', 6.99, 1, 'valentine.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('The wreath', 'Tis the season!', 9.99, 1, 'xmas.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Create Your Own', 'Anyway you want!', 10.99, 1, 'create.jpg');

/* PRODUCTS FOR SANDWICHES */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Philly Sandwich', 'Just like the pizza, but in a sandwich!', 5.99, 2, 'philly-sandwich.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Grilled Cheese Deluxe', 'Typical healthy sandwich', 4.99, 2, 'grilled-cheese.jpeg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Healthy Edition', 'The most healthy sandwich you have ever eaten!', 7.99, 2, 'healthy.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Italian Bunwich', 'An interesting one!', 8.99, 2, 'italian-bunwich.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Pizza Burger', 'As advertised', 9.99, 2, 'pizza-burger.jpg');

/* PRODUCTS FOR PASTA */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Penne Rosa', 'Our signature pasta!', 8.49, 3, 'penne.jpg');

/* PRODUCTS FOR SIDES */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('French Fries', 'Made in France', 1.99, 4, 'fries.jpg');

/* PRODUCTS FOR DESSERTS */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Chocolate Cookies', 'Warm and soft', 0.99, 5, 'cookies.jpg');

/* PRODUCTS FOR DRINKS */
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Soft Drink', 'Coca Cola products only', 1.99, 6, 'coke.jpg');
INSERT INTO `products`(`name`, `description`, `price`, `category`, `picture`)
    VALUES ('Dasani Water', 'Not Free', 2.99, 6, 'dasani.jpg');

/* CUSTOMIZATIONS */
INSERT INTO `customizationCategories`(`name`, `multiple`) VALUES ('Crust', 0);
INSERT INTO `customizationCategories`(`name`, `multiple`) VALUES ('Pizza Sauce', 0);
INSERT INTO `customizationCategories`(`name`, `multiple`) VALUES ('Toppings', 1);

INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Thin', 1);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Traditional', 1);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Pan', 1);

INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Saucy Tomato', 2);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Marinara', 2);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('BBQ Sauce', 2);

INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Pineapple', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Pepperoni', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Bacon', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Ham', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Chicken', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Beef', 3);
INSERT INTO `customizations`(`value`, `custCatId`) VALUES ('Spinach', 3);