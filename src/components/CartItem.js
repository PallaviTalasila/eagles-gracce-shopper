import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: '0 5px 15px hsla(0, 0%, 0%, 0.2)'
    },
    media: {
        height: 140,
    },
    content: {
        display: 'flex',
        gap: '1rem',
    },
    large: {
        width: '4rem',
        height: '4rem',
    },
    priceTag: {
        background: '#26F0F1',
        color: 'white',
        padding: 5,
        margin: 10,
        fontSize: '0.8em',
        borderRadius: '0.5em'
    }
});

function CartItem(props) {
    const { cardData } = props;
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.content}>

                    <Avatar variant="rounded" className={classes.large} src={cardData?.detail?.img} />
                    <div>
                        <Typography component="h5" variant="h6">
                            {cardData?.detail?.title || ''}<span className={classes.priceTag}>${cardData.price}</span>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {cardData?.detail?.description || ''}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Quantity: {cardData?.quantity || ''}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>

            <CardActions style={{ display: 'flex', justifyContent: "flex-end" }}>
                <Button size="small" color="secondary">
                    REMOVE
                    </Button>
                {/* <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    style={{ backgroundColor: '#26F0F1', color: 'black' }}
                >
                    Edit Cart
                </Button> */}
            </CardActions>
        </Card>
    )
}

export default CartItem
