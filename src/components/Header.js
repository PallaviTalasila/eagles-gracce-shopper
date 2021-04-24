import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
// import Logo from './imgs/Logo.svg';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Logo() {
  return (
    <img
      style={{ background: "transparent", height: 50, width: 50 }}
      src="/imgs/GraceShopperLogo.png"
    />
  );
}

function Header({ setUsername, setPassword, loggedIn, setLoggedIn }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ color: "#26F0F1", backgroundColor: "#5F5B6B" }}
      >
        <Toolbar>
          <Link to="/products">
            <IconButton>
              <Logo />
            </IconButton>
          </Link>

          <h1 style={{ flexGrow: "1" }}>Grace Shopper</h1>

          <h1 style={{ flexGrow: "1" }}>Grace Shopper</h1>

          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#26F0F1" }}
          >
            <Button color="inherit" endIcon={<StorefrontIcon />}>
              Products
            </Button>
          </Link>

          <Link to="/cart" style={{ textDecoration: "none", color: "#26F0F1" }}>
            <Button color="inherit" endIcon={<ShoppingCartIcon />}>
              Cart
            </Button>
          </Link>

          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#26F0F1" }}
          >
            <Button color="inherit" endIcon={<LockIcon />}>
              Login
            </Button>
          </Link>

          {!loggedIn ? null : (
            <Link className={classes.linkColor} to="/myOrders">
              <Button color="inherit">My Orders</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
