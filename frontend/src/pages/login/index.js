import { Button, Card, CardContent, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../apiHelper'
import UserContext from '../../UserContext'

const formTextFieldStyles = {
  marginBottom: 3
}

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState({})

  const handleLogin = async () => {
    if (!email) {
      setError({
        email: 'Please enter an email address'
      })
    }
    if (!password) {
      setError({
        email: 'Please enter a password'
      })
    }
    try {
      setError({})
      const { data } = await login(email, password)
      if (data && data.accessToken) {
        setUser({
          accessToken: data.accessToken
        })
        window.localStorage.setItem('access-token', data.accessToken)
      }
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 400) {
        setError({
          password: 'Invalid email or password'
        })
      }
      console.log(err)
    }
  }

  return (
    <div className='form-wrapper'>
      <Card sx={{ minWidth: 500 }} variant='outlined'>
        <CardContent>
          <div className='item-row'>
            <TextField
              sx={formTextFieldStyles}
              fullWidth
              label='Email'
              variant='outlined'
              value={email}
              onChange={event => {
                setEmail(event.target.value)
              }}
              error={!!error?.email}
              helperText={error?.email}
            />
          </div>
          <div>
            <TextField
              sx={formTextFieldStyles}
              fullWidth
              label='Password'
              variant='outlined'
              type='password'
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
              error={!!error?.password}
              helperText={error?.password}
            />
          </div>
          <Button variant='outlined' fullWidth onClick={() => handleLogin()}>
            Login
          </Button>
          <div className='register-link' onClick={() => navigate('/signup')}>
            Register
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
