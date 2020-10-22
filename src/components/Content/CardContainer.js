import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { SingleCard } from "./SingleCard";
import axios from "axios";
import Spinner from "../Layout/Spinner";
import Pagination from '@material-ui/lab/Pagination';

export const CardContainer = () => {
  const [movies, setMovies] = useState([]);
  const [pageState, setPageState] = useState({
    totalPage:1,
    currentPage:1
  });
  const {totalPage, currentPage} = pageState
  const handleChange = async (event, value) => {
     setPageState({...pageState,[currentPage]:value});
     setMovies([])
     getMovies(value)
  };
  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies(page = 1) {
    try {
      const res = await axios.get(`https://nz-rating-app.herokuapp.com/api/movies/?page=${page}`);
      setMovies(res.data.results);
      setPageState({totalPage:res.data.total_pages, currentPage:page})
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {movies.length > 0 ? 
          <Fragment>
            <SingleCard moviesProp={movies} currentPage={pageState.currentPage} /> 
            <Pagination count={totalPage}  page={pageState.currentPage} color="primary" showFirstButton showLastButton 
            onChange={handleChange}  /> 
              </Fragment>: <Spinner />}
        </Grid>
        
      </div>
    </Fragment>
  );
};
