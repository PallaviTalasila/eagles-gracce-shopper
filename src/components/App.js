import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { getAllLinks } from "../api";
import { Header, Products } from "../components";

const App = () => {
//   const [links, setLinks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     try {
//       Promise.all([getAllLinks()]).then(([data]) => {
//         setLinks(data);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

  return (
    <div className="app">
      <Router>
        <Header/>
        <Switch>
          <Route path="/">
            <Products
              
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;