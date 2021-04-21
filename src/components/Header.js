import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LockIcon from '@material-ui/icons/Lock';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{color:'#26F0F1', backgroundColor:'#5F5B6B'}}>
                <Toolbar>
                
                <Typography variant="h6" className={classes.title}>
                    Grace Shopper
                </Typography>
                <Button 
                    color="inherit"
                    endIcon={<StorefrontIcon />}
                    >Products</Button>
                <Button
                    color="inherit"
                    endIcon={<ShoppingCartIcon />}
                    >Cart</Button>
                <Button 
                color="inherit"
                endIcon={<LockIcon />}>Login</Button>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header
