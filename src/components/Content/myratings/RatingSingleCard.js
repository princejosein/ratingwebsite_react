import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import StarsIcon from "@material-ui/icons/Stars";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    height: "200px",
  },
  button: {
    margin: 1,
  },
});

export const RatingSingleCard = ({ moviesProp, currentPage }) => {
  let history = useHistory();
  const [movieState, setMovieState] = useState(moviesProp);
  // const [pageState, setPage] = useState(currentPage)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const rateClick = (e) => {
    console.log(e.target);
    const newRate = e.target.value;
    const movieId = e.target.name;
    addOrUpdateMovieRate(movieId, newRate);
  };

  const detailsClick = (Id) => {
    history.push(`/Movie/${Id}`)
  }

  const addOrUpdateMovieRate = async (Id, Rate) => {
    if(!localStorage.getItem('token')){
      alert('Please login to review')
    } else {
      //http://127.0.0.1:8000
      //https://nz-rating-app.herokuapp.com
      try {
        const AuthToken = `Token ${localStorage.getItem('token')}`;
        axios.defaults.headers.common["Authorization"] =
        AuthToken
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/movies/${Id}/movie_rating/`,
          {
            stars: Rate,
          }
        );
        getMovies();
      } catch (err) {
        console.log(err);
      }
    }
    
  };
  async function getMovies() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my_ratings`);
      setMovieState(res.data.results);
    } catch (error) {
      console.error(error);
    }
  }
  return movieState.map((movie, index) => (
    <Grid item xs={12} sm={6} md={6} lg={4} m='3' key={index}>
      <Card >
        <CardMedia image={movie.movie_item.imageurl} className={classes.image} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {movie.movie_item.title}
          </Typography>
          <Box component='fieldset' borderColor='transparent'>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ justifyContent: "center" }}
            >
              {movie.stars} 
            </Typography>
            <Rating
              name={"" + movie.movie_item.id}
              value={movie.stars}
              onChange={(e) => {
                rateClick(e);
              }}
              style={{ justifyContent: "center" }}
            />
          </Box>
          <Typography variant='body1' gutterBottom >
            {movie.movie_item.description}
          </Typography>
        </CardContent>

        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<StarsIcon />}
            onClick={(e) => detailsClick(movie.movie_item.id)}
            name={"" + movie.id}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));
};
