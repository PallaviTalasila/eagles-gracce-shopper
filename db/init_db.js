// code to build and initialize DB goes here
const {
  client,

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
      PRICE INTEGER , QUANTITY INTEGER);    
    
    CREATE TABLE USERS (
      ID SERIAL PRIMARY KEY,
      USERNAME VARCHAR(255) UNIQUE NOT NULL,
      PASSWORD VARCHAR(255) NOT NULL,
      EMAIL VARCHAR(255) UNIQUE NOT NULL);    
    
    CREATE TABLE ORDERS (
      ID SERIAL PRIMARY KEY,
      USERID INTEGER REFERENCES USERS(ID),
      PRODUCTID INTEGER REFERENCES PRODUCTS(ID) NOT NULL,
      PRICE integer, QUANTITY integer);    
    
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
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
