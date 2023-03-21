import React,{useRef,useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UserAuth } from '../context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

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

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signIn } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //const [error, setError] = useState("")

 //const [loading, setLoading] = useState(false)
  //const navigate=useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (validator.isEmail(emailRef.current.value)) {
      try {
        setError('')
        await signIn(emailRef.current.value, passwordRef.current.value)
        navigate('/home')
      } catch (e) {
        setError("Cannot login")
      }
    } else {
      setError('Enter valid Email!')
    }
  };


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
            LOGIN IN
          </Typography>

          <Box height={20}/>
          {error &&
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputRef={emailRef}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputRef={passwordRef}
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}