import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import zIndex from '@material-ui/core/styles/zIndex';
import { Link } from 'react-router-dom';
import { editOrder, getOrdersByUser } from '../api';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100% !important',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  media: {
    height: 140,
  },

  title: {
    flexBasis: '100%',
    height: '20vh',
    backgroundColor: '#0A8754'
  },
  checkoutStyle: {
    // position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  btnSty: {
    backgroundColor: '#26F0F1', color: 'black', margin: '1rem',
  },
  checkoutContainer: {
    position: "relative",
    padding: "2rem",
    display: "flex",
    justifyContent: "flex-end",
  }

});

const dummyData = [
  {
    name: 'Shoes',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Shits',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Shorts',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Bags',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },

  {
    name: 'Shoes',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Shits',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Shorts',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
  {
    name: 'Bags',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    price: '$399',
  },
]
function Cart({ cartData, setCartData, username }) {
  console.log("🚀 ~ file: Cart.js ~ line 86 ~ Cart ~ username", username)

  const classes = useStyles();

  useEffect(() => {
    try {
      Promise.all([getOrdersByUser(username)]).then(([data]) => {
        setCartData(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  return (
    <>
      <div className={classes.root}>
        {
          cartData.map((item, index) => {
            return (
              <Grid key={index} xs={12} md={5} lg={5} wrap="wrap-reverse" style={{ margin: '1rem' }}>
                <CartItem cardData={item} />
              </Grid>
            )
          })
        }
      </div>
      <div className={classes.checkoutContainer} >
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.btnSty}
        >
          Edit Cart
                </Button>
        <Link
          to="/checkout"
          style={{ textDecoration: "none", color: "#26F0F1" }}
        >
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.btnSty}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Cart

