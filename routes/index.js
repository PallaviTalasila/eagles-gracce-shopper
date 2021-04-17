const apiRouter = require("express").Router();

const {
  // getLinks,
  // updateLinkAndTagByLinkId,
  // createLinkAndTag,
  // getLinksByTagName,
  createProduct,
  createUser,
  createOrder,
  createReview,
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
    postProduct = await createProduct({ title, description, price, quantity });
    res.send(postProduct);
  } catch (error) {
    next(error);
  }
}); // The price takes a numerical value, It needs to have a dollar sign by it
// i don't know if we should do that on the front end or backend

apiRouter.post("/users/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    postUser = await createUser({ username, password, email  });
    res.send(postUser);
  } catch (error) {
    next(error);
  }
});


apiRouter.post("/orders", async (req, res, next) => {
  try {
    const { userid, productid, price, quantity } = req.body;
    postOrder = await createOrder({ userid, productid, price, quantity });
    res.send(postOrder);
  } catch (error) {
    next(error)
  }
});

apiRouter.post("/reviews", async (req, res, next) => {
  try {
    const { userid, productid, reviewtext } = req.body;
    postReview = await createReview({ userid, productid, reviewtext });
    res.send(postReview);
  } catch (error) {
    next(error)
  }
});

/************************************ GET METHODS *******************************/ 



apiRouter.get("/products", async (req, res, next) => {
  try {
    const getProducts = await getProducts();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/users", async (req, res, next) => {
  try {
    const getUsers = await getUsers();
    res.send(getUsers);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/orders", async (req, res, next) => {
  try {
    const getOrders = await getOrders();
    res.send(getOrders);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/reviews", async (req, res, next) => {
  try {
    const getReviews = await getReviews();
    res.send(getReviews);
  } catch (error) {
    next(error);
  }
});

/***************************GET BY ID ****************************/

apiRouter.get("/order/:orderName/orders", async (req, res, next) => {
  try {
    const { tagName } = req.params;

    const linksByTagName = await getLinksByTagName(tagName);
    res.send(linksByTagName);
  } catch (error) {
    next(error);
  }
});

/**
 * 
POST /api/links (creates tags during link creation)
 */

apiRouter.post("/links", async (req, res, next) => {
  try {
    const { link, comment, tag } = req.body;
    linkAndTag = await createLinkAndTag({ link, comment, tag });
    res.send(linkAndTag);
  } catch (error) {
    next(error);
  }
});

/**
 * 
PATCH /api/links/:id (used both to update comment/tags as well as to increment the click count)
 */

apiRouter.patch("/links/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, tag, addToCount } = req.body;

    updateLinkAndTag = await updateLinkAndTagByLinkId({
      id,
      comment,
      tag,
      addToCount,
    });
    res.send(updateLinkAndTag);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;