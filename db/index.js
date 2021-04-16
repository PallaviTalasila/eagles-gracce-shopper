// Connect to DB
const { Client } = require("pg");
const DB_NAME = "grace-shopper";
//const DB_URL =   process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
//for heroku1
const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

// database methods

/**********************************Product Methods************************/

async function createProduct({ title, description, price, quantity }) {
  const query = `INSERT INTO
      products(title, description,price,quantity)
      VALUES($1, $2,$3,$4)
      returning *`;
  const values = [title, description, price, quantity];

  try {
    const {
      rows: [product],
    } = await client.query(query, values);
    return product;
  } catch (error) {
    throw error;
  }
}

/**********************************User Methods************************/

async function createUser({ username, password, email }) {
  const query = `INSERT INTO
      users(username, password,email)
      VALUES($1, $2,$3)
      returning *`;
  const values = [username, password, email];

  try {
    const {
      rows: [user],
    } = await client.query(query, values);
    return user;
  } catch (error) {
    throw error;
  }
}

/**********************************Order Methods************************/

async function createOrder({ userid, productid, price, quantity }) {
  const query = `INSERT INTO
      orders(userid, productid, price, quantity)
      VALUES($1, $2,$3,$4)
      returning *`;
  const values = [userid, productid, price, quantity];

  try {
    const {
      rows: [order],
    } = await client.query(query, values);
    return order;
  } catch (error) {
    throw error;
  }
}

/**********************************Review Methods************************/

async function createReview({ userid, productid, reviewtext }) {
  const query = `INSERT INTO
      reviews(userid, productid, reviewtext)
      VALUES($1, $2,$3)
      returning *`;
  const values = [userid, productid, reviewtext];

  try {
    const {
      rows: [review],
    } = await client.query(query, values);
    return review;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createProduct,
  createUser,
  createOrder,
  createReview,
};
