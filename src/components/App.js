import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getAllProducts } from "../api";
// import { getAllLinks } from "../api";
import { Header, Products, Login, Register } from "../components";
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);

  useEffect(() => {
    try {
      Promise.all([getAllProducts()]).then(([data]) => {
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setProducts]);

  return (
    <div className="app">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/products">
            <Products
             products={products}
             setProducts={setProducts} />
          </Route>

          <Route exact path="/login">
            <Login
             username={username}
             setUsername={setUsername}
             password={password}
             setPassword={setPassword}
             userToken={userToken}
             setUserToken={setUserToken}
             loggedIn={loggedIn}
             setLoggedIn={setLoggedIn}
             />
          </Route>

          <Route exact path="/register">
            <Register
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
          </Route>

          <Route exact path="/createproduct"> {/* Will change this to /:productid/create*/}
            <Register/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
};

export default App;