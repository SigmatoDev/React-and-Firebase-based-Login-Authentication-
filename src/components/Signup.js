import  React,{useRef, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UserAuth} from '../context/AuthContext'
import validator from 'validator'
//import {createUserWithEmailAndPassword} from "firebase/auth"
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const emailRef=useRef()
  const passwordRef = useRef()
  const passwordConfirmRef=useRef()
  const { createUser } = UserAuth();
  const navigate = useNavigate()
  const [error, setError]=useState("")
  const [loading,setLoading]=useState(false);
  
 
  async function handleSubmit(e) {
    e.preventDefault()

    if (validator.isEmail(emailRef.current.value)) {
      try {
        setError("")
        setLoading(true)
        await createUser(emailRef.current.value, passwordRef.current.value)
        navigate('/home')
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)

    } else {
      setError('Enter valid Email!')
    }
      
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    
  }


  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <img src={Logo} alt="logo"/> */}
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          
          <Box height={20}/>
          {error &&
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  inputRef={emailRef}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputRef={passwordRef}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  inputRef={passwordConfirmRef}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={loading} 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>  
  );
          }
