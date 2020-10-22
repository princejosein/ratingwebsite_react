import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { SingleRestaurentCard } from "./SingleRestaurentCard";
import axios from "axios";
import Spinner from "../Layout/Spinner";

export const CardRestaurentContainer = () => {
  const [restaurents, setRestaurent] = useState([]);
  useEffect(() => {
    getRestaurents();
  }, []);
  async function getRestaurents() {
    try {
      const res = await axios.get("https://nz-rating-app.herokuapp.com/api/restaurents/");
      setRestaurent(res.data.results);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {restaurents.length > 0 ? (
            <SingleRestaurentCard restaurentsProp={restaurents} />
          ) : (
            <Spinner />
          )}
        </Grid>
      </div>
    </Fragment>
  );
};
