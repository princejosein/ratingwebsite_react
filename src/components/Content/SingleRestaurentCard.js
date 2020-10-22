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

export const SingleRestaurentCard = ({ restaurentsProp }) => {
  const [restaurentsState, setRestaurent] = useState(restaurentsProp);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const rateClick = (e) => {
    console.log(e.target);
    const newRate = e.target.value;
    const movieId = e.target.name;
    addOrUpdateMovieRate(movieId, newRate);
  };

  const addOrUpdateMovieRate = async (Id, Rate) => {
    if(!localStorage.getItem('token')){
      alert('Please login to review')
    } else {
      try {
        const AuthToken = `Token ${localStorage.getItem('token')}`;
        axios.defaults.headers.common["Authorization"] = AuthToken
        const res = await axios.post(
          `https://nz-rating-app.herokuapp.com/api/restaurents/${Id}/restaurent_rating/`,
          {
            stars: Rate,
          }
        );
        getRestaurents();
        //window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const truncateDescription =(str) => {
      return str.length > 100 ? str.substring(0, 97) + "..." : str;
  }
  async function getRestaurents() {
    try {
      const res = await axios.get("https://nz-rating-app.herokuapp.com/api/restaurents/");
      // setRestaurent(res.data);
      setRestaurent(res.data.results);
    } catch (error) {
      console.error(error);
    }
  }
  return restaurentsState.map((restaurent, index) => (
    <Grid item xs={12} sm={6} md={6} lg={4} m='3' key={index}>
      <Card>
        <CardMedia image={restaurent.imageurl} className={classes.image} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {restaurent.title}
          </Typography>
          <Box component='fieldset' borderColor='transparent'>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ justifyContent: "center" }}
            >
              {restaurent.avg_rating} ({restaurent.no_of_ratings})
            </Typography>
            <Rating
              name={"" + restaurent.id}
              value={restaurent.avg_rating}
              onChange={(e) => {
                rateClick(e);
              }}
              style={{ justifyContent: "center" }}
            />
          </Box>
          <Typography variant='body1' gutterBottom>
            {truncateDescription(restaurent.description)}
          </Typography>
        </CardContent>

        {/* <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<StarsIcon />}
          >
            Rate It
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  ));
};
