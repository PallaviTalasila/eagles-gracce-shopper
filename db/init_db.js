// code to build and initialize DB goes here1
const {
  client,
  createProduct,
  createUser,
  createOrder,
  createReview,
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    console.log("Dropping All Tables...");
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS REVIEWS;
    DROP TABLE IF EXISTS ORDERS;
    DROP TABLE IF EXISTS USERS;
    DROP TABLE IF EXISTS PRODUCTS;   
  `);
    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE PRODUCTS (
      ID SERIAL PRIMARY KEY,
      TITLE TEXT UNIQUE NOT NULL,
      DESCRIPTION VARCHAR(255),
      PRICE DECIMAL, 
      QUANTITY INTEGER);    
    
    CREATE TABLE USERS (
      ID SERIAL PRIMARY KEY,
      USERNAME VARCHAR(255) UNIQUE NOT NULL,
      PASSWORD VARCHAR(255) NOT NULL,
      EMAIL VARCHAR(255) UNIQUE NOT NULL);    
    
    CREATE TABLE ORDERS (
      ID SERIAL PRIMARY KEY,
      USERID INTEGER REFERENCES USERS(ID),
      PRODUCTID INTEGER REFERENCES PRODUCTS(ID) NOT NULL,
      PRICE decimal, 
      QUANTITY integer);    
    
    CREATE TABLE REVIEWS (
        USERID INTEGER REFERENCES USERS(ID) NOT NULL,
        PRODUCTID integer REFERENCES PRODUCTS(ID) NOT NULL,
        REVIEWTEXT VARCHAR(255) NOT NULL);         
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("Starting to create products...");

    const productsToCreate = [
      {
        title: "Product1",
        description: "product1 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product2",
        description: "product2 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product3",
        description: "product3 description",
        price: 19.99,
        quantity: 2,
      },
      {
        title: "Product4",
        description: "product4 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product5",
        description: "product5 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product6",
        description: "product6 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product7",
        description: "product7 description",
        price: 100,
        quantity: 2,
      },
      {
        title: "Product8",
        description: "product8 description",
        price: 100,
        quantity: 2,
      },
    ];

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");

    console.log("Starting to create users...");

    const usersToCreate = [
      {
        username: "user1",
        password: "passcode1",
        email: "user1@example.com",
      },
      {
        username: "user2",
        password: "passcode2",
        email: "user2@example.com",
      },
      {
        username: "user3",
        password: "passcode3",
        email: "user3@example.com",
      },
      {
        username: "user4",
        password: "passcode4",
        email: "user4@example.com",
      },
      {
        username: "user5",
        password: "passcode5",
        email: "user5@example.com",
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    console.log("Starting to create orders...");

    const ordersToCreate = [
      {
        userid: 1,
        productid: 1,
        price: 100,
        quantity: 2,
      },
      {
        userid: 2,
        productid: 2,
        price: 100,
        quantity: 2,
      },
      {
        userid: 3,
        productid: 3,
        price: 19.99,
        quantity: 2,
      },
    ];

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders!");

    console.log("Starting to create reviews...");

    const reviewsToCreate = [
      {
        userid: 1,
        productid: 1,
        reviewtext: "review text 1",
      },
      {
        userid: 2,
        productid: 2,
        reviewtext: "review text 2",
      },
      {
        userid: 3,
        productid: 3,
        reviewtext: "review text 3",
      },
    ];

    const reviews = await Promise.all(reviewsToCreate.map(createReview));

    console.log("Reviews created:");
    console.log(reviews);
    console.log("Finished creating reviews!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
