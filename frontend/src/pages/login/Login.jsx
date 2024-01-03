// Login.jsx
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container, Modal } from '@mui/material'
import useAuthStores from '../../stores/auth/Auth'
import useUserStore from '../../stores/user/AddUserStore'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Message } from '@mui/icons-material'
const Login = () => {
  const { postLogin, handleSubmit, setEmail, setPassword } = useAuthStores() // Mendapatkan fungsi postLogin, handleSubmit, setEmail, dan setPassword dari useAuthStores
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [email, setEmailPw] = useState('')
  const { resetPassword } = useUserStore()
  const handleForgotPassword = async () => {
    // Call the API to reset the password
    const response = await resetPassword(email)
    const message = response.message
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 4000 // Set the timer to 4 seconds
    })

    setShowForgotPasswordModal(false)
  }

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          marginTop: 8
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
                my: 10,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component='h1' variant='h5'>
                Sign in
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
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={e => setEmail(e.target.value)} // Mengatur nilai email menggunakan setEmail
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={e => setPassword(e.target.value)} // Mengatur nilai password menggunakan setPassword
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
                  onClick={postLogin}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href='#'
                      variant='body2'
                      onClick={() => setShowForgotPasswordModal(true)}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>

                <Modal
                  open={showForgotPasswordModal}
                  onClose={() => setShowForgotPasswordModal(false)}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: 'background.paper',
                      boxShadow: 24,
                      p: 4
                    }}
                  >
                    <Typography
                      id='modal-modal-title'
                      variant='h6'
                      component='div'
                    >
                      Forgot Password
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                      <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        type='email' // Tambahkan atribut type dengan nilai 'email'
                        onChange={e => setEmailPw(e.target.value)}
                      />
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={handleForgotPassword}
                      >
                        Reset Password
                      </Button>
                    </Typography>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
