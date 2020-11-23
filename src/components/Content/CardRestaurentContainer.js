import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { SingleRestaurentCard } from "./SingleRestaurentCard";
import axios from "axios";
import Spinner from "../Layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from "@material-ui/core/Hidden";
import setAuthToken from '../../utils/setAuthToken'

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

export const CardRestaurentContainer = () => {
  const classes = useStyles();
  const [restaurents, setRestaurent] = useState([]);
  const [searchState, setSearchState] = useState('');
  useEffect(() => {
    getRestaurents();
  }, []);
  const searchClick = async () => {
    getRestaurents(searchState);
  }
  const onChange = (e) => setSearchState(e.target.value);
  async function getRestaurents(search = '') {
    try {
      let res = '';
      // const res = await axios.get("https://nz-rating-app.herokuapp.com/api/restaurents/");
      //res = await axios.get(`http://127.0.0.1:8000/api/restaurents_filter/?search=${search}`);
      if(search && search != null && search !== '')
      {
        setRestaurent([]);
        const AuthToken = `Token ${localStorage.getItem('token')}`;
        alert(AuthToken)
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurents_filter/?search=${search}`,{
          headers: {
            'Authorization': `token ${AuthToken}`
          }
        });
        setRestaurent(res.data.results)
      } else {
        const AuthToken = `Token ${localStorage.getItem('token')}`;
        axios.defaults.headers.common["Authorization"] =
        AuthToken
        setRestaurent([]);
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurents/`)
        setRestaurent(res.data.results);
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
            placeholder="Enter restaurent name and click on search" 
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
