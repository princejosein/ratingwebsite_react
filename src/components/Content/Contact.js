import React, { Fragment, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com'
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    heading: {
      margin: '20px 0',
      width:"90%",
      textAlign:"center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color:"#3f51b5",
        marginBottom:"20px"
      },
      formClass:{
          marginBottom:"20px"
      }
  }));
const Contact = () => {
    const classes = useStyles();
    const [contactState, setContactState] = useState({
      name:'',
      email:'',
      message:''
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {name, email, message} = contactState;
    const onchange = (e) => setContactState({ ...contactState, [e.target.name]: e.target.value });
    const sendEmail = () => {
      emailjs.init("user_a8sdK3DjwFet1YtKj1x7t");
      try {
        emailjs.send("service_n0rbyz9","template_mfyca4k",{
          name: name,
          email: email,
          message: message,
          reply_to: email,
          });
          enqueueSnackbar('Message send to administrator, will contact you back soon!', { 
            variant: 'success',
        });
          resetForm()
      } catch (error) {
        enqueueSnackbar('Message send error. Try again after some time', { 
          variant: 'error',
      });
      }
     

    }
    const resetForm = () => {
      setContactState({
        name:'',
        email:'',
        message:''
      })
    }
    return (
        <div className={classes.root}>
             <Typography variant="h4" gutterBottom color="primary" className={classes.heading} >
                Contact
            </Typography>

     <Grid container spacing={2} >
        <Grid item xs m='3'>
          <Paper className={classes.paper}>
              {<MailIcon />}
              <p>abcd@gmail.com</p>
          </Paper>
        </Grid>
        <Grid item xs m='3'>
          <Paper className={classes.paper}>
          {<PhoneIcon />}
              <p>+64 000 000 0000</p>              
              </Paper>
        </Grid>
      </Grid>                                               
      <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" name="name" value={name} onChange={onchange} className={classes.formClass} fullWidth size="small" label="Name" variant="outlined"  />
      <TextField id="outlined-basic" name="email" value={email} onChange={onchange}  className={classes.formClass} fullWidth size="small" label="Email" variant="outlined"  /> 
      <TextField id="standard-textarea" name="message" value={message} onChange={onchange}  className={classes.formClass} variant="outlined" label="Message" fullWidth multiline size="small"
        />
         <Button variant="contained" fullWidth className={classes.formClass}  color="primary" onClick={sendEmail}>
            Submit
      </Button>
    </form> 
     

    </div>
    )
}

export default Contact
