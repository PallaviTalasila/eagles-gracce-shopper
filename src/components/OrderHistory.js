import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { getOrdersByUser, addOrder } from "../api";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

async function createOrder(e) {
  e.preventDefault();
  try {
    const order = await addOrder(null, 1, null, 100, 3, "user1");
  } catch (error) {
    console.error(error);
  }
}

export default function OrderHistory({ username, loggedIn }) {
  const classes = useStyles();

  const [orderHist, setOrderHist] = useState([]);

  useEffect(() => {
    try {
      Promise.all([getOrdersByUser(username)]).then(([data]) => {
        console.log("order data:", data);
        setOrderHist(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      ' I am in here1'
      <button onClick={createOrder}>create order</button>
    </div>
  );
}
