import React, { Fragment } from "react";
import "./App.css";
import { Navbar } from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";
import { CardContainer } from "./components/Content/CardContainer";
import { CardRestaurentContainer } from "./components/Content/CardRestaurentContainer";
import { Login } from "./components/Auth/Auth"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <Router>
      <Fragment>
        <Grid container direction='column'>
          <Grid item>
            <Navbar />
          </Grid>
          <Grid item container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Switch>
                <Route exact path='/' component={CardContainer} />
                <Route exact path='/Movies' component={CardContainer} />
                <Route
                  exact
                  path='/Restaurents'
                  component={CardRestaurentContainer}
                />
                <Route
                  exact
                  path='/Login'
                  component={Login}
                />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
          </Grid>
        </Grid>
      </Fragment>
    </Router>
  );
}

export default App;
