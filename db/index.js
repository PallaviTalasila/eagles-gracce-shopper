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

async function getAllProducts() {
  const query = `select * from products;`;

  try {
    const { rows } = await client.query(query);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function editProducts({ id, title, description, price, quantity }) {
  try {
    /*Update title of a prodcut*/
    if (title) {
      const {
        rows: [product],
      } = await client.query(
        `
          UPDATE products
          SET title = $2
          WHERE id=$1
          RETURNING *;
      `,
        [id, title]
      ); // does this need a return statement?
    }

    /*Update description*/

    if (description) {
      const {
        rows: [product],
      } = await client.query(
        `
            UPDATE products
            SET description =$2
            WHERE id=$1
            RETURNING *;
        `,
        [id, description]
      );
    }

    /*Update price*/

    if (price) {
      const {
        rows: [product],
      } = await client.query(
        `
            UPDATE products
            SET price =$2
            WHERE id=$1
            RETURNING *;
        `,
        [id, price]
      );
    }

    /*Update Quantity*/

    if (quantity) {
      const {
        rows: [product],
      } = await client.query(
        `
            UPDATE products
            SET quantity =$2
            WHERE id=$1
            RETURNING *;
        `,
        [id, quantity]
      );
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProducts(id) {
  try {
    /* Delete a product */
    if (id) {
      const {
        rows: [product],
      } = await client.query(
        `
          Delete products        
          WHERE id=$1
          RETURNING *;
      `,
        [id]
      );
    }

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

async function getOrdersByUser(userid) {
  const query = `select * from orders where userid=1`;
  const values = [userid];

  try {
    const {
      rows: [order],
    } = await client.query(query, values);
    return order;
  } catch (error) {
    throw error;
  }
}

async function editOrder(id, productid, quantity) {
  try {
    
    /*Update Quantity on the order/cart*/

    const {
      rows: [order],
    } = await client.query(
      `
            UPDATE orders
            SET quantity =$3
            WHERE id=$1
            and productid=$2
            RETURNING *;
        `,
      [id, productid, quantity]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(id, productid) {
  try {
    /*delete product from order/cart*/

    const {
      rows: [order],
    } = await client.query(
      `
            delete orders            
            WHERE id=$1
            and productid=$2
            RETURNING *;
        `,
      [id, productid]
    );

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
  getAllProducts,
  editProducts,
  deleteProducts,
  editOrder,
  deleteOrder,
  getOrdersByUser
};
