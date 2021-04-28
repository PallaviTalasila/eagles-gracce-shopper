const apiRouter = require("express").Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');


// MVP = Most Viable Product

// COMPARE & PULL REQUEST, THEN PULL REQUEST, THEN POST TO EAGLES LETTING PEOPLE KNOW

const {
  createProduct,
  createUser,
  createOrder,
  createReview,
  getAllProducts,
  editProducts,
  deleteProducts,
  editOrder,
  deleteOrder,
  getOrdersByUser,
  getUserByUsername,
  getUser,
} = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

/************************* USER ROUTES **********************************/



apiRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await getUserByUsername(username);

    if (userExists) {
      res.status(401);
      return next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      return next({
        name: "InvalidPassword",
        message: "All passwords to be atleast 8 characters long",
      });
    }
    const postUser = await createUser({ username, password, email });
    res.send(postUser);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
       JWT_SECRET
      );

      res.send({ message: "Login Successful!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});


/***************************PRODUCT ROUTES***********************/

apiRouter.get("/products", async (req, res, next) => {
  try {
    const getProducts = await getAllProducts();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});


apiRouter.post("/products", async (req, res, next) => {
  try {
    const { title, description, price, quantity } = req.body;
    const postProduct = await createProduct({
      title,
      description,
      price,
      quantity,
    });
    res.send(postProduct);
  } catch (error) {
    next(error);
  }
}); 


apiRouter.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity } = req.body;

    updateProduct = await editProducts({
      id,
      title,
      description,
      price,
      quantity,
    });
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});


apiRouter.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteProduct = await deleteProducts({ id });
    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
});

/***************************ORDERS***********************/

apiRouter.get("/orders/:userName", async (req, res, next) => {
  try {
    const { userid } = req.params;

    const ordersByUser = await getOrdersByUser(userid);
    res.send(ordersByUser);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/orders", async (req, res, next) => {
  try {
    const { userid, productid, price, quantity } = req.body;
    const postOrder = await createOrder({ userid, productid, price, quantity });
    res.send(postOrder);
  } catch (error) {
    next(error);
  }
});


apiRouter.patch("/orders/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productid, quantity } = req.body;

    const updateOrder = await editOrder({ id, productid, quantity });
    res.send(updateOrder);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/orders/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productid } = req.body;
    const deletedOrder = await deleteOrder({ id, productid });
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});


/***************************REVIEWS***********************/

apiRouter.get("/reviews", async (req, res, next) => {
  try {
    const getReviews = await getReviews();
    res.send(getReviews);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/reviews", async (req, res, next) => {
  try {
    const { userid, productid, reviewtext } = req.body;
    const postReview = await createReview({ userid, productid, reviewtext });
    res.send(postReview);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
