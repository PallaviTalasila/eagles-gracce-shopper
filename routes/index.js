const apiRouter = require("express").Router();
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
  getOrdersByUser
} = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

/************************* CREATE METHODS **********************************/

apiRouter.post("/products", async (req, res, next) => {
  try {
    const { title, description, price, quantity } = req.body;
    const postProduct = await createProduct({ title, description, price, quantity });
    res.send(postProduct);
  } catch (error) {
    next(error);
  }
}); // The price takes a numerical value, It needs to have a dollar sign by it
// i don't know if we should do that on the front end or backend

apiRouter.post("/users/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const postUser = await createUser({ username, password, email  });
    res.send(postUser);
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
    next(error)
  }
});

apiRouter.post("/reviews", async (req, res, next) => {
  try {
    const { userid, productid, reviewtext } = req.body;
    const postReview = await createReview({ userid, productid, reviewtext });
    res.send(postReview);
  } catch (error) {
    next(error)
  }
});

/************************************ GET METHODS *******************************/ 



apiRouter.get("/products", async (req, res, next) => {
  try {
    const getProducts = await getAllProducts();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});

// apiRouter.get("/users", async (req, res, next) => {
//   try {
//     const getUsers = await getUsers();
//     res.send(getUsers);
//   } catch (error) {
//     next(error);
//   }
// });      No DB GET USER method yet


apiRouter.get("/reviews", async (req, res, next) => {
  try {
    const getReviews = await getReviews();
    res.send(getReviews);
  } catch (error) {
    next(error);
  }
});

/***************************GET BY ID ****************************/

apiRouter.get("/orders/:orderName", async (req, res, next) => {
  try {
    const { userid } = req.params;

    const ordersByUser = await getOrdersByUser(userid);
    res.send(ordersByUser);
  } catch (error) {
    next(error);
  }
});

/********************************PATCH(UPDATE) METHODS *****************/

apiRouter.patch("/products/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity } = req.body;

    updateProduct = await editProducts({
      id, 
      title, 
      description, 
      price, 
      quantity
    });
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/orders/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productid, quantity } = req.body;

    const updateOrder = await editOrder({id, productid, quantity});
    res.send(updateOrder);
  } catch (error) {
    next(error);
  }
});



/**************************** DESTROY METHODS *************************/

apiRouter.delete("/products/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteProduct = await deleteProducts({ id });
    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/orders/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productid } = req.body;
    const deleteOrder = await deleteOrder({ id, productid });
    res.send(deleteOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;