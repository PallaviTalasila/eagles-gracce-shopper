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
    DROP SEQUENCE IF EXISTS ORDER_ID_SEQ; 
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
      IMG VARCHAR(255),
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
      ORDERID INTEGER NOT NULL,
      PRICE decimal, 
      QUANTITY integer);    

    CREATE SEQUENCE order_id_seq;
    
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
        title: "Bicycle",
        description: "Nitrous not included",
        price: 200,
        quantity: 12,
        img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Laptop",
        description: "Quad core flux capacitor included",
        price: 2000,
        quantity: 28,
        img: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1419&q=80",
      },
      {
        title: "Shoes",
        description: "They may or may not make you run faster",
        price: 19.99,
        quantity: 56,
        img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        
      },
      {
        title: "Game of Thrones Last Season",
        description: "I honestly wouldn't buy this",
        price: 40,
        quantity: 221,
        img: "https://target.scene7.com/is/image/Target/GUEST_88847cb2-dcc5-4acb-8f77-4879e915d1ad?wid=488&hei=488&fmt=pjpeg",
      },
      {
        title: "Lamborghini Gallardo",
        description: "Very Shiny",
        price: 200000,
        quantity: 2,
        img: "https://media.ed.edmunds-media.com/lamborghini/gallardo/2012/oem/2012_lamborghini_gallardo_convertible_lp-570-4-spyder-performante_fq_oem_1_815.jpg",
      },
      {
        title: "Bowl Of Soup",
        description: "Pretty much edible",
        price: 4,
        quantity: 100,
        img: "https://cdnimg.webstaurantstore.com/images/products/large/33754/820790.jpg",
      },
      {
        title: "Solar Panels",
        description: "Sustainability is cool these days",
        price: 900,
        quantity: 8,
        img: "http://giecdn.azureedge.net/storage/fileuploads/image/2020/12/15/solar%20panelsweb.jpg?w=736&h=414&mode=crop",
      },
      {
        title: "Water Bottle",
        description: "Indestructable",
        price: 15,
        quantity: 30,
        img: "https://static8.depositphotos.com/1015682/896/i/600/depositphotos_8965353-stock-photo-bottle-water-and-splash.jpg",
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
        orderid:2000,
        price: 100,
        quantity: 2,
      },
      {
        userid: 2,
        productid: 2,
        orderid:2001,
        price: 100,
        quantity: 2,
      },
      {
        userid: 3,
        productid: 3,
        orderid:2001,
        price: 19.99,
        quantity: 2,
      },
      {
        userid: 3,
        productid: 2,
        orderid:2001,
        price: 124.99,
        quantity: 1,
      },
      {
        userid: 3,
        productid: 1,
        orderid:2001,
        price: 10,
        quantity: 2,
      },
      {
        userid: 3,
        productid: 3,
        orderid:2001,
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
