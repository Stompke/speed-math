import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import '../App.css';
import Paper from '@material-ui/core/Paper';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        color: 'white',
      },
    },
    paper: {
      padding: 50,
      background: '#ffffff90'
    }
  }));

const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [ credentials, setCredentials ] = useState({});
    const [open, setOpen] = React.useState(false);

  const handleSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const onChangeHandler = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    const loginUser = e => {
      e.preventDefault()
      axiosWithAuth()
      .post('api/users/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.message)
        history.push('/');
      })
      .catch( err => {
        console.log(err.response.data.message)
        handleSnackbar(err.response.data.message)
        
      })
    }

    return (
        <div className='App-header'>
          <Paper className={classes.paper} elevation={3}>
            <h1>Login</h1>
            <form onSubmit={loginUser} className={classes.root} noValidate autoComplete="off">
                <TextField onChange={onChangeHandler} name="email" id="email" label="email" variant="outlined" />
                {/* <TextField onChange={onChangeHandler} name="username" id="username" label="username" variant="outlined" /> */}
                <TextField onChange={onChangeHandler} name="password" type='password' id="password" label="password" variant="outlined" />
                <Button variant="contained" type='submit' color="primary">Log In</Button>
            </form>
            <h6>
              <Link to="/register" >register</Link>
            </h6>
          </Paper>
          <div className={classes.root}>
            <Button variant="outlined" onClick={handleSnackbar}>
              Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

            <Alert severity="error">This is an error message!</Alert>
            </Snackbar>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert>
          </div>
        </div>
    )
}

export default Login;