import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [fullname, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (!fullname || !email || !password || !confirmPassword) {
      Swal.fire('Error!', 'All fields are required', 'error')
      return
    }

    if (password !== confirmPassword) {
      Swal.fire('Error!', 'Password and Confirm Password do not match', 'error')
      return
    }

    // If validation passes, call the register function
    register()
  }

  const register = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/register`,
        {
          fullname,
          email,
          password,
          roles: 'user' // You can customize the roles as needed
        }
      )

      console.log(response)

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Registration successful, login into ur account',
          timer: 2000, // Set the timer to 2 seconds
          showConfirmButton: false
        })

        navigate('/login')
      } else {
        // Registration failed, handle error cases
        console.error('Registration failed')
        Swal.fire('Error!', 'Registration failed', 'error')
      }
    } catch (error) {
      // Handle errors, including validation errors and server errors
      if (error.response && error.response.status === 400) {
        // Validation error (e.g., email already exists)
        console.error('Validation error:', error.response.data.message)
        Swal.fire('Error!', error.response.data.message, 'error')
      } else {
        // Server error or other unexpected errors
        console.error('Error during registration:', error.message)
        Swal.fire('Error!', 'Error during registration', 'error')
      }
    }
  }

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 4
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: t =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4, // Adjust this value to your preference
                mx: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component='h1' variant='h5'>
                Register
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  name='name'
                  autoComplete='name'
                  autoFocus
                  value={fullname}
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={e => setPassword(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  autoComplete='new-password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                {/* <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                /> */}
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link
                      to='/login'
                      variant='body2'
                      style={{ textAlign: 'center' }}
                    >
                      {'Already have an account? Sign In'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register
