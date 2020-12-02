import React,{Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios'

const useStyles = makeStyles({
    root: {
      marginBottom:'20px'
    },
    button: {
        margin: 1,
      },
      textarea:{
          width:'100%'
      },
      comment:{
          marginBottom:'20px'
      }
  });

const CommentComponent = ({
    comments,
    movie_id,
    size
}) => {

    const classes = useStyles();
    const [userId, setUserId] = useState(0);
    const [commentState,setCommentState] = useState("")
    const [sizeState, setSizeState] = useState(0)
    useEffect(() => {
        getAuth();
      }, []);
      async function getAuth() {
        try {
            const AuthToken = `Token ${localStorage.getItem('token')}`;
            axios.defaults.headers.common["Authorization"] =
            AuthToken
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_user`)
            setUserId(res.data.user_id)
          console.log(res.data.user_id)
        } catch (error) {
          console.error(error);
        }
      }
      
      async function DeleteComment(commentId, index)
      {
          try {
            const AuthToken = `Token ${localStorage.getItem('token')}`;
            axios.defaults.headers.common["Authorization"] =
            AuthToken
            const res = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/moviecomment/${commentId}`);
            comments.splice(index,1)
            setSizeState(comments.length)
            setCommentState("");
            console.log(comments)
          } catch (error) {
              console.log(error)
          }
      }
      async function postComment()
      {
          try {
              if(commentState.length > 0)
              {
                const AuthToken = `Token ${localStorage.getItem('token')}`;
                axios.defaults.headers.common["Authorization"] =
                AuthToken
                const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/moviecomment/`,
                {
                    comment: commentState,
                    user:userId,
                    movie:movie_id,
                }
                );
                console.log(res.data.data)
                comments.push(res.data.data)
                setSizeState(comments.length)
                setCommentState("");
                console.log(comments)
              }
          } catch (error) {
              console.log(error)
          }
      }
    return (
        <div>
            {
            <Fragment>
                { userId != 0 && 
                <div className={classes.comment}>
                <textarea
                value={commentState}
                name='comment'
                rows='5'
                className={classes.textarea}
                placeholder='Comment'
                onChange={(e) => {setCommentState(e.target.value)}}
             ></textarea>
          <Button
          onClick={(e) => postComment()}
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
      >
          Post
      </Button>
          </div>
          }   
            { size > 0 ?
                <Fragment>
                {comments.map((comment, index) => (
                     <Card className={classes.root} key={comment.id}>
                     <CardActionArea>
                       <CardContent>
                         <Typography gutterBottom variant="h5" component="h2">
                         {comment.comment}
                         </Typography>
                         <Typography variant="body2" color="textSecondary" component="p">
                         {comment.user_item.username}
                         </Typography>
                       </CardContent>
                     </CardActionArea>
                     {userId == comment.user &&
                     <CardActions>
                                                
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={(e) => DeleteComment(comment.id, index)}
                        >
                            Delete
                        </Button>
                        
                     </CardActions>

                     }
                   </Card>
                ))}
                </Fragment>
                :<p>No Comments</p>}
            </Fragment>
}
        </div>
    )
}

CommentComponent.propTypes = {
    comments:PropTypes.array,
    commentSize:PropTypes.string,
}

export default CommentComponent
