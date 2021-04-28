import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './cart/CartItem'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import zIndex from '@material-ui/core/styles/zIndex';
import { Link } from 'react-router-dom';

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
function Cart() {

  const classes = useStyles();


  return (
    <>
    <div className={classes.root}>
      <div className={classes.title}>
        <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: '4%', color: 'white' }}>
          My Cart
            </h1>
      </div>
      {
        dummyData.map((item, index) => {
          return (
            <Grid key={index} xs={12} md={5} lg={5} wrap="wrap-reverse" style={{ margin: '1rem' }}>
              <CartItem cardData={item} />
            </Grid>
          )
        })
      }
    </div>
    <div className = {classes.checkoutContainer}>

      <Button
      className = {classes.checkoutStyle}
        variant="contained"
        size="large"
        color="primary"
      >
        Checkout
                </Button>
    </div>
    </>
  )
}

export default Cart

