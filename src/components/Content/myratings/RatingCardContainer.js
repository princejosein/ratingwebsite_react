import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { RatingSingleCard } from "./RatingSingleCard";
import axios from "axios";
import Spinner from "../../Layout/Spinner";
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  btnMenu: {
    color: "#fff",
    textDecoration: "none",
    marginLeft:"20px",
    border: "1px solid #fff"
  },
  searcharea: {
      backgroundColor:"#020F59",
      height:"80px",
      marginBottom:"20px",
      textAlign:"center",
  },
  pagination:{
    width:"100%"
  },
  search: {
      backgroundColor:"#fff",
      width:"60%",
      height:"40px",
      marginTop:"20px",
      borderRadius:"30px",
      border:"none",
      padding:"0 10px",
      marginBottom:"10px"
  }

}));

export const RatingCardContainer = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      let res = '';
      setMovies([]);
      const AuthToken = `Token ${localStorage.getItem('token')}`;
        axios.defaults.headers.common["Authorization"] =
        AuthToken
      res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my_ratings`);
      console.log(res.data)
      setMovies(res.data.results)
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
            <RatingSingleCard moviesProp={movies} /> 
           
              </Fragment>: <Spinner />}
        </Grid>
        
      </div>
    </Fragment>
  );
};
