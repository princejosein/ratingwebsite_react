import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { SingleCard } from "./SingleCard";
import axios from "axios";
import Spinner from "../Layout/Spinner";
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

export const CardContainer = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [pageState, setPageState] = useState({
    totalPage:1,
    currentPage:1
  });
  const {totalPage, currentPage} = pageState
  const [searchState, setSearchState] = useState('');
  const handleChange = async (event, value) => {
     setPageState({...pageState,[currentPage]:value});
     setMovies([])
     getMovies(value)
  };
  const searchClick = async () => {
    getMovies(1, searchState);
  }
  useEffect(() => {
    getMovies();
  }, []);

  const onChange = (e) => setSearchState(e.target.value);

  async function getMovies(page = 1, search = '') {
    try {
      let res = '';
      if(search && search != null && search !== '')
      {
        setMovies([]);
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies_filter/?page=${page}&search=${search}`);
        setMovies(res.data.results)
        setPageState({totalPage:1, currentPage:1})
      } else {
        setMovies([]);
        console.log(process.env.REACT_APP_API_URL)
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/?page=${page}`)
        setMovies(res.data.results);
        setPageState({totalPage:res.data.total_pages, currentPage:page})
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div style={{ padding: 20 }}>
      <div className={classes.searcharea}>
            <form>
            <input type="text" 
            name="search" 
            value={searchState}
            onChange={(e) => onChange(e)}
            placeholder="Enter movie name and click on search" 
            className={classes.search} 
            ></input>
            <Button
              onClick={searchClick}
              variant='outlined'
              className={classes.btnMenu}
              startIcon={<SearchIcon />}
            >
            <Hidden only={["xs"]}>SEARCH</Hidden>
          </Button>
          </form>
        </div>
        <Grid container spacing={2}>
          {movies.length > 0 ? 
          <Fragment>
            <SingleCard moviesProp={movies} currentPage={pageState.currentPage} /> 
            <Pagination count={totalPage} className={classes.pagination}   page={pageState.currentPage} color="primary" showFirstButton showLastButton 
            onChange={handleChange}  /> 
              </Fragment>: <Spinner />}
        </Grid>
        
      </div>
    </Fragment>
  );
};
