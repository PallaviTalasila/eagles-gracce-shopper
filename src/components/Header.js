import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 8,
    border: `2px solid #26F0F1`,
    padding: "0 4px",
  },
}))(Badge);

function Header({ setUsername, setPassword, loggedIn, setLoggedIn ,count}) {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem(`Token`);
    localStorage.removeItem(`Username`);
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    history.push("/products");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ color: "#26F0F1", backgroundColor: "#5F5B6B" }}
      >
        <Toolbar>
          <Link to="/products">
            <IconButton>
              <img
                style={{ background: "transparent", height: 50, width: 50 }}
                src="/imgs/GraceShopperLogoNew.png"
                alt=""
              />
              ;
            </IconButton>
          </Link>

          <h1 style={{ flexGrow: "1" }}>Grace Shopper</h1>

          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#26F0F1" }}
          >
            <Button color="inherit" endIcon={<StorefrontIcon />}>
              Products
            </Button>
          </Link>

          {!loggedIn ? null : (
            <Link
              className={classes.linkColor}
              style={{ textDecoration: "none", color: "#26F0F1" }}
              to="/myOrders"
            >
              <Button color="inherit">My Orders</Button>
            </Link>
          )}

          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#26F0F1",
              marginLeft: "1%",
              marginRight: "1%",
            }}
          >
            <Button
              color="inherit"
              endIcon={
                <StyledBadge badgeContent={count} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              }
            >
              Cart
            </Button>
          </Link>

          {loggedIn ? null : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#26F0F1" }}
            >
              <Button color="inherit" endIcon={<LockIcon />}>
                Login
              </Button>
            </Link>
          )}
          {!loggedIn ? null : (
            <Button
              color="inherit"
              endIcon={<ExitToAppIcon />}
              onClick={handleClick}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
