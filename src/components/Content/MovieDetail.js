import React,{ Fragment, useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import CommentComponent from './CommentComponent'

const useStyles = makeStyles((theme) => ({
    movieDetailsClass: {
      backgroundColor: "#EFEFEF",
      padding:10,
      color:"#000",
      border: "1px solid #fff",
      width:"100%"
    },
    detailsText:{
        fontSize:"45px",
        lineHeight:"24px",
        marginLeft:"6px"
    },
    linkButton: {
        textDecoration:"none !important"
    }
  
  }));

export const MovieDetail = () => {
    const classes = useStyles();
    const [movie, setMovie] = useState({});
    const [comments, setComments] = useState([]);
    const [commentSize, setCommentSize] = useState(0);
    const [user, setUser] = useState(0);
    let { movie_id } = useParams();
    // const {movie, comments, commentSize} = movieItem
    useEffect(() => {
        getMovie();
      }, []);
      async function getMovie() {
        try {
          let res = '';
          if(movie_id)
          {
            setMovie({});
            const AuthToken = `Token ${localStorage.getItem('token')}`;
            axios.defaults.headers.common["Authorization"] =
            AuthToken
            res = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/${movie_id}`)
            setMovie(res.data.movie);
            console.log(res.data.comments)
            setComments(res.data.comments);
            setCommentSize(res.data.comments.length);
            setUser(res.data.user_id)
            console.log(comments)
          }
          
        } catch (error) {
          console.error(error);
        }
      }
    return (
        <Fragment>
            <div style={{ padding: 20 }}></div>
            <Grid container spacing={5}>
            <Grid item >
            <img src={movie.imageurl} alt="movie" />            
            </Grid>
            <Grid item xs={12} sm container >
                <div className={classes.movieDetailsClass}>
                <Typography variant="h5" align="center">
                    {movie.title}
                </Typography>               
                <br /><br />

                <Grid container item xs={12} spacing={2} align="center" >
                <Grid item xs={6}>
                    <StarsIcon fontSize="large" color="secondary"  />
                    <span className={classes.detailsText}>{movie.avg_rating}</span>
                    <p>average rating</p>
                    </Grid>
                    <Grid item xs={6}>
                    <GroupIcon fontSize="large" color="primary"  />
                    <span className={classes.detailsText}>{movie.no_of_ratings}</span>
                    <p>votes count</p>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container item xs={12} spacing={2} align="center">
                <Grid item xs={6}>
                    {/* <StarsIcon fontSize="large" color="secondary"  /> */}
                    <p>{movie.year}</p>
                    <p>year</p>
                    </Grid>
                    <Grid item xs={6}>
                    {/* <StarsIcon fontSize="large" color="secondary"  /> */}
                    <p>{movie.genre}</p>
                    <p>genre</p>
                    </Grid>
                </Grid>
               
                </div>

            
            </Grid>
                </Grid>
            
          
            <p>{movie.description}</p>

            <h4>Comments {commentSize}</h4>
            <hr></hr>
            <CommentComponent comments={comments} size={commentSize} user={user} movie_id={movie_id} />
            <Link to="/movies">
            <Button variant="contained" color="primary" className={classes.linkButton}>
                Back
            </Button>
            </Link>
            <br /><br />
        </Fragment>
    )
}
export default MovieDetail