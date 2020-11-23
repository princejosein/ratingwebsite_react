import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoviesIcon from "@material-ui/icons/Theaters";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LoginIcon from "@material-ui/icons/ArrowRightAlt";
import { Link, Redirect } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import MailIcon from '@material-ui/icons/Mail';
import StarsIcon from '@material-ui/icons/Stars';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btnMenu: {
    color: "inherit",
    textDecoration: "none",
  },
  stickToTop: {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex:"1000"
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  const [login, setLogin] = useState(false)

  if(localStorage.getItem('token') && login == false){
    setLogin(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setLogin(false)
  }

  return (
    <div className={classes.stickToTop}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>

          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.btnMenu}>
              Rating Website
            </Link>
          </Typography>

          <Link to='/Movies' className={classes.btnMenu}>
            <Button
              variant='outlined'
              color='inherit'
              className={classes.button}
              startIcon={<MoviesIcon />}
            >
              <Hidden only={["xs"]}>Movies</Hidden>
            </Button>
          </Link>

          <Link to='/Restaurents' className={classes.btnMenu}>
            <Button
              color='inherit'
              variant='outlined'
              color='inherit'
              className={classes.button}
              startIcon={<RestaurantIcon />}
            >
              <Hidden only={["xs"]}>Restaurents</Hidden>
            </Button>
          </Link>

          
          <Link to='/Contact' className={classes.btnMenu}>
            <Button
              color='inherit'
              variant='outlined'
              color='inherit'
              className={classes.button}
              startIcon={<MailIcon />}
            >
              <Hidden only={["xs"]}>Contact</Hidden>
            </Button>
          </Link>

          { login ? 
          (
            <Fragment>
            <Link to='/MyRatings' className={classes.btnMenu}>
            <Button
              color='inherit'
              variant='outlined'
              color='inherit'
              className={classes.button}
              startIcon={<StarsIcon />}
            >
              <Hidden only={["xs"]}>My Ratings</Hidden>
            </Button>
          </Link>
          <Button
          onClick={logout}
              color='inherit'
              variant='outlined'
              color='inherit'
              className={classes.button}
              startIcon={<LoginIcon />}
            >
            <Hidden only={["xs"]}>Logout</Hidden>
            </Button>
            </Fragment>
            ) : (
            <Link to="/Login" className={classes.btnMenu}>
            <Button
                color='inherit'
                variant='outlined'
                color='inherit'
                className={classes.button}
                startIcon={<LoginIcon />}
              >
              <Hidden only={["xs"]}>Login</Hidden>
              </Button>
            </Link>
          )}
          
        </Toolbar>
      </AppBar>
    </div>
  );
};
