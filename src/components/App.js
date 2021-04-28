import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getAllProducts } from "../api";
import { Header, Products, Login, Register, OrderHistory } from "../components";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);

  return (
    <div className="app">
      <Router>
        <Header
          setUsername={setUsername}
          setPassword={setPassword}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <Register
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setEmail={setEmail}
                email={email}
              />
            )}
          />
          <Route
            path="/products"
            render={(props) => (
              <Products
                {...props}
                products={products}
                setProducts={setProducts}
              />
            )}
          />
          <Route
            path="/myOrders"
            render={(props) => (
              <OrderHistory
                {...props}
                username={username}
                loggedIn={loggedIn}
              />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              <Products
                {...props}
                products={products}
                setProducts={setProducts}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
