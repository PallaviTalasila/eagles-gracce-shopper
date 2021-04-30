import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReactFlagsSelect from 'react-flags-select';
import swal from "sweetalert";
import { login } from "../api";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    placeContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "lightgreen",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '3.5rem !important',
  },
  dropDown: {
    margin: '15px 0 0 0',
    '& > .ReactFlagsSelect-module_selectBtn__19wW7': {
      height: '3.5rem !important',
    }
  },
}));

const CheckOut = ({
  username,
  loggedIn,
  userToken,
}) => {

  const history = useHistory();

  const [name, setName] = useState("");
  const [mailId, setMailId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zCode, setZCode] = useState("");
  const [country, setCountry] = useState("");

  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      swal("Order has been confirmed").then(() => {
        history.replace("/myOrders");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const classes = useStyles();

  if (!loggedIn) {
    return <Redirect push to="/products" />
  }

  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={8} component={Paper} elevation={6} square justify="center">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingCartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CheckOut
          </Typography>
          <form className={classes.form} onSubmit={fetchApi}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="First & last name"
              autoFocus
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Mailing address:"
              label="Mailing address:"
              autoFocus
              onChange={(event) => setMailId(event.target.value)}
              value={mailId}
            />

            <Grid container xs={12} lg={12} elevation={6} justify="center" spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={6}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="City"
                  label="City"
                  autoFocus
                  onChange={(event) => setCity(event.target.value)}
                  value={city}
                />
              </Grid>
              <Grid
                item
                xs={11}
                sm={6}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="State"
                  label="State"
                  autoFocus
                  onChange={(event) => setState(event.target.value)}
                  value={state}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} lg={12} elevation={6} spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={6}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Zip/Postal code"
                  label="Zip/Postal code"
                  autoFocus
                  onChange={(event) => setZCode(event.target.value)}
                  value={zCode}
                />
              </Grid>
            </Grid>
            <ReactFlagsSelect
              className={classes.dropDown}
              selected={country}
              onSelect={code => setCountry(code)}
              searchable={true}
              placeholder="Select Country"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: '#26F0F1', color: 'black' }}
            >
              Place Order
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default CheckOut;
