import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { grey } from '@material-ui/core/colors';
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    align: "center",
    margin: "auto",
  },
  footer: {
    width: "100%",
    minHeight:"160px"
  },
  copyright: {
    textAlign: "center",
  },
  box: {
    width: "18%"
  },
  btnMenu: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
      <AppBar position='static' className={(classes.root, classes.footer)}>
         <Grid item container>

        <Grid item xs={12} sm={2}>
        <List component="nav" >
          <ListItem >
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.btnMenu}>
              Rating Website
            </Link>
          </Typography>
         </ListItem>
         
         <ListItem >
         <ListItemText primary="© ratingwebsite 2020" />
         </ListItem>
        </List>

        </Grid>

        <Grid item xs={12} sm={2}>
        <List component="nav">
          <ListItem button>
          <Link to='/Movies' className={classes.btnMenu}>
              Movies
            </Link>
         </ListItem>
         <ListItem button>
          <Link to='/Restaurents' className={classes.btnMenu}>
          Restaurents
            </Link>
         </ListItem>
         <ListItem button>
          <Link to='/Login' className={classes.btnMenu}>
              Login
            </Link>
         </ListItem>
        </List>
        </Grid>

        <Grid item xs={12} sm={2}>
        <List component="nav" >
          <ListItem button>
          <ListItemIcon  color="primary">
            <FacebookIcon style={{ color: grey[50] }} />
          </ListItemIcon >
          <a href="https://www.facebook.com/" target="_blank" className={classes.btnMenu}>
              Facebook
            </a>
         </ListItem>

         <ListItem button>
          <ListItemIcon  color="primary">
            <TwitterIcon style={{ color: grey[50] }} />
          </ListItemIcon >
          <a href="https://www.twitter.com/" target="_blank" className={classes.btnMenu}>
              Twitter
            </a>
         </ListItem>

         <ListItem button>
          <ListItemIcon  color="primary">
            <InstagramIcon style={{ color: grey[50] }} />
          </ListItemIcon >
          <a href="https://www.instagram.com/" target="_blank" className={classes.btnMenu}>
              Instagram
            </a>
         </ListItem>
        </List>
        </Grid>
          
        <Grid item xs={12} sm={3}>
        <List component="nav" >
          <ListItem >
          <ListItemText primary="Any suggetions or questions" />
         </ListItem>
         <ListItem >
          <ListItemText primary="Please email us at abcd@gmail.com" />
         </ListItem>
         <ListItem >
          <ListItemText primary="Dial +64 000 000 0000" />
         </ListItem>
        </List>
        </Grid>
        
<Grid item xs={12} sm={3}>
        <List component="nav" >
          <ListItem >
          <ListItemText primary="000 North Road, Morningside " />
         </ListItem>
         <ListItem >
          <ListItemText primary="Auckland,  New Zealand" />
         </ListItem>
         <ListItem >
          <ListItemText primary="Dial +64 000 000 1111" />
         </ListItem>
        </List>
        </Grid>

         </Grid>
        
        
      
        {/* <Toolbar>
          <Typography className={classes.copyright} position='center'>
            Rating Website
          </Typography>
        </Toolbar> */}
      </AppBar>
  );
};
