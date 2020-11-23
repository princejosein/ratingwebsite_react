import React, { Fragment } from "react";
import "./App.css";
import { Navbar } from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";
import { CardContainer } from "./components/Content/CardContainer";
import { CardRestaurentContainer } from "./components/Content/CardRestaurentContainer";
import { Login } from "./components/Auth/Auth";
import Contact from "./components/Content/Contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieDetail from "./components/Content/MovieDetail"
import { RatingCardContainer } from "./components/Content/myratings/RatingCardContainer"

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "50px",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Fragment>
        <Grid container direction='column'>
          <Grid item>
            <Navbar />
          </Grid>
          <Grid item container className={classes.main}>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Switch>
                <Route exact path='/' component={CardContainer} />
                <Route exact path='/Contact' component={Contact} />
                <Route exact path='/Movies' component={CardContainer} />
                <Route exact path='/Movie/:movie_id' component={MovieDetail} />
                <Route exact path='/MyRatings' component={RatingCardContainer} />
                <Route exact path='/Restaurents' component={CardRestaurentContainer} />
                <Route exact path='/Login' component={Login} />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
          </Grid>
        </Grid>
        <Grid item>
            <Footer />
        </Grid>
      </Fragment>
    </Router>
  );
}

export default App;
