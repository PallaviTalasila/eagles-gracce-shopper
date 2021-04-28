import React ,{useEffect}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import placeholderimg from './imgs/placeholderimg.png'
import { editOrder,getAllProducts } from '../api';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        margin: '2%'
      },
      media: {
        height: 140,
      },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Products({products, count, setCount,setProducts}) {
console.log(products)
    const classes = useStyles();

    useEffect(() => {
      try {
        Promise.all([getAllProducts()]).then(([data]) => {
          setProducts(data);
        });
      } catch (error) {
        console.log(error);
      }
    }, []);
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
 

    return (
        <div>
       
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {products.map((product, index) =>  
        <Card className={classes.root} id={index}>
               
                <CardMedia
                className={classes.media}
                image={placeholderimg}
                />
                <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  variant="h5"
                  component="h5"
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="textPrimary"
                  variant="h5"
                  component="h5"
                >
                  ${product.price}
                </Typography>

                <Typography
                  variant="body2"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  Quantity : {product.quantity}
                </Typography>

                </CardContent>
            
            <CardActions>
                <Button 
                size="small" 
                style={{backgroundColor:"#0A8754", color:'white'}} 
                variant="contained"
                type="button"
                onClick={handleOpen}>
                Reviews
              </Button>

                <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                
                >
                <Fade in={open}>
                    <div className={classes.paper}>
                    <h2 id="transition-modal-title">I think the backdrops are stacking on top of eachother, causing it to be black</h2>
                    <p id="transition-modal-description">{product.reviewtext}</p> 
                    </div>
                </Fade>
                </Modal> 

                <Button 
                variant="outlined"
                size="small" 
                
                style={{backgroundColor:'#26F0F1', color:'black'}}
                endIcon={<ShoppingCartIcon />}
                onClick={() => {

                    setCount(count + 1);
                    console.log(index, product.id) // I think we need to add id's to the table? Not sure.
                    // editOrder({id, product.id, quantity})
                }}
                >
                Add to Cart
                </Button>

                {count > 0 ? <Button 
                variant="contained"
                size="small" 
                color="secondary"
                endIcon={<ShoppingCartIcon />}
                onClick={() => {
                    setCount(count - 1);
                    // editOrder({id, product.id, quantity})
                }}
                >
                Remove from Cart
                </Button> : null}

            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
}
// ********************************** ADD A NOTIFICATION TO THE CART ICON **************************//
export default Products;
