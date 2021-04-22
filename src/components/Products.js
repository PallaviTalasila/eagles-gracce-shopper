import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import placeholderimg from './imgs/placeholderimg.png'
import IconButton from '@material-ui/core/IconButton';
import { getAllProducts } from '../api';

const useStyles = makeStyles({
  root: {
    width: '20%',
    margin: '2%'
  },
  media: {
    height: 140,
  },
  title: {
      flexBasis: '100%',
      height: '20vh',
      backgroundColor: '#0A8754'
  }
});


function Products({products, setProducts}) {
console.log(products)
    const classes = useStyles();


    return (
        <div>
        <div className ={classes.title}>
            <h1 style={{display:'flex', justifyContent:'center', paddingTop:'4%', color:'white'}}>
            Our Products
            </h1>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {products.map((product, idx) =>   
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={placeholderimg}
                title="PlaceHolder"
                />
                <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                {product.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" variant='h5' component="h5">
                {product.description}
                </Typography>

                <Typography variant="body2" color="textPrimary" variant='h5' component="h5">
                ${product.price}
                </Typography>

                <Typography variant="body2" color="textPrimary" variant='h6' component="h6">
                Quantity : {product.quantity}
                </Typography>

                </CardContent>
            </CardActionArea>
            
            <CardActions>
                <Button size="small" color="primary">
                Reviews
                </Button>

                <Button 
                variant="outlined"
                size="small" 
                color="secondary"
                endIcon={<ShoppingCartIcon />}
                >
                Add to Cart
                </Button>
            </CardActions>

        </Card>
        )}    
        </div>

        </div>
    )
}
// ********************************** ADD A NOTIFICATION TO THE CART ICON **************************//
export default Products
