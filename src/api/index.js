import axios from "axios";
/***********************USER FUNCTIONS*******************/

export async function register(username, password, email) {
  try {
    const payload = { username: username, password: password, email: email };

    const { data } = await axios.post(`/api/register`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const payload = { username: username, password: password };

    const { data } = await axios.post(`/api/login`, payload);

    return data;
  } catch (error) {
    throw error;
  }
}

/***********************PRODUCTS******************************/

export async function getAllProducts() {

  if (localStorage.getItem('products')) {
    return JSON.parse(localStorage.getItem('products'));
  }
  try {
    const { data } = await axios.get(`/api/products`);
    localStorage.setItem('products', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProduct(title, description, price, quantity) {
  try {
    const payload = {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
    };
    const { data } = await axios.post(`/api/products`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editProduct(id, title, description, price, quantity) {
  try {
    const payload = {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
    };
    const { data } = await axios.patch(`/api/products/${id}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

/***********************ORDER/CART******************************/

export async function getOrdersByUser(username) {
  const allproducts = JSON.parse(localStorage.getItem('products') || []);
  try {
    const { data } = await axios.get(`/api/orders/${username}`);
    data.map((item) => {
      item.detail = allproducts.find(i => i.id == item.productid);
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addOrder(
  userid,
  productid,
  orderid,
  price,
  quantity,
  username
) {
  try {
    const payload = {
      userid: userid,
      productid: productid,
      orderid: orderid,
      price: price,
      quantity: quantity,
      username: username,
    };

    const { data } = await axios.post(`/api/orders`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editOrder(id, productid, quantity) {
  try {
    const payload = { productid: productid, quantity: quantity };

    const { data } = await axios.patch(`/api/orders/${id}`, payload);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrder(id, productid) {
  try {
    const payload = { productid: productid };
    const { data } = await axios.delete(`/api/orders/${id}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}
