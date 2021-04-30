import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { getOrdersByUser } from "../api";

const useStyles = makeStyles({
  root: {
    maxWidth: "75%",
    margin: "auto",
    paddingTop: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    height: 140,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  cardWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "20px",
  },
});

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
    <div className={classes.root}>
      {orderHist.map((order) => (
        <Paper elevation={0} className={classes.wrapper}>
          <span>Order # {order.orderid}</span>
          {order.products.map((product) => (
            <Card className={classes.cardWrap}>
              <CardActionArea>
                <CardMedia className={classes.media} image={product.img} />
                <CardContent>
                  <Typography gutterBottom >
                    {product.description}
                    <br/>
                    Price :${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Paper>
      ))}
    </div>
  );
}
