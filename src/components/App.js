import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Products, Login, Register, OrderHistory } from "../components";
import "./App.css";

/* Need More specified alerts, like if there is no user registered. 
   Also need to get the IMGS Renderings
   And the Quantity Working on the Database end
   Make the remove from cart only render on the specified product
   Pop up a modal with all the reviewtexts 
   Fonts for certain html tags staying default
   change description to only use one line
   Add to Cart will store the OrderId on local storage
   Create Review
    */
const App = () => {
  const [products, setProducts] = useState([]);
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <Router>
        <Header
          setUsername={setUsername}
          setPassword={setPassword}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          count={count}
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
                count={count}
                setCount={setCount}
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
                count={count}
                setCount={setCount}                
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
