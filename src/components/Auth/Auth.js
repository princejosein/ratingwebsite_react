import React, { Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },
    textField: {
      width: '80%',
    },
  }));

export const Login = () => {
  
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [IsLoginView,setIsLoginView] = useState(true)

    if(localStorage.getItem('token')){
      return <Redirect to="/" />
    }

  
    const loginSubmit = () => {
      loginUser()
    }
    const registerSubmit = () => {
      registerUser()
    }
    async function loginUser() {
      try {
        const data = {
          'username':username,
          'password':password
        }
        const res = await axios.post('https://nz-rating-app.herokuapp.com/auth/', data);
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      } catch (error) {
        alert('Error')
        console.error(error);
      }
    }
    async function registerUser() {
      try {
        const data = {
          'username':username,
          'password':password
        }
        const res = await axios.post('https://nz-rating-app.herokuapp.com/api/users/', data);
        alert('Registered. Please login now')
        setIsLoginView(true)
      } catch (error) {
        alert('Error')
        console.error(error);
      }
    }
    return (
        <Fragment>
        <Container style={{ textAlign: "center", width:"90%" }}>
        <h2>{IsLoginView ? 'Login' : 'Register' }</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Username" 
            variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}  /><br></br>
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" 
            value={password} onChange={(e) => setPassword(e.target.value)}   /><br></br>
            {IsLoginView ? 
            <Button onClick={loginSubmit} variant="contained" color="primary">Login</Button> : 
            <Button onClick={registerSubmit} variant="contained" color="primary">Register</Button>
            }
        </form>
        {IsLoginView ? (
        <Typography variant="subtitle1" gutterBottom>
        Dont have account  &nbsp;
         <Link href="#" onClick={() => setIsLoginView(false)}>
        Register now
    </Link>
      </Typography>) : 
      (<Typography variant="subtitle1" gutterBottom>
      Already have account login now  &nbsp;
       <Link href="#" onClick={() => setIsLoginView(true)}>
      Login
  </Link>
    </Typography>)}
        
        </Container>
        
        </Fragment>
    )
}
