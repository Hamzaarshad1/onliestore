import { Button, Card, CardContent, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { USERS_API_PATH } from '../../config'
import { useNavigate } from 'react-router-dom'

const formTextFieldStyles = {
  marginBottom: 3
}

const Signup = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [formError, setFormError] = useState({})

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleSubmit = async () => {
    if (!name || name.length < 5) {
      setFormError({ name: 'Please fill in a valid name' })
      return
    }
    if (!email || !validateEmail(email)) {
      setFormError({ email: 'Please fill in a valid email' })
      return
    }
    if (!password || password.length < 5) {
      setFormError({ password: 'Password must contain at least 5 characters' })
      return
    }
    if (!confirmPassword || password !== confirmPassword) {
      setFormError({ confirmPassword: 'Passwords must match' })
      return
    }
    setFormError({})
    try {
      await axios.post(USERS_API_PATH, { name, email, password })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form-wrapper'>
      <Card sx={{ width: 500 }} variant='outlined'>
        <CardContent>
          <TextField
            sx={formTextFieldStyles}
            fullWidth
            label='Name'
            variant='outlined'
            value={name}
            onChange={event => setName(event.target.value)}
            error={!!formError.name}
            helperText={formError.name}
          />
          <TextField
            sx={formTextFieldStyles}
            fullWidth
            label='Email'
            variant='outlined'
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={!!formError.email}
            helperText={formError.email}
          />
          <TextField
            sx={formTextFieldStyles}
            fullWidth
            label='Password'
            variant='outlined'
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            error={!!formError.password}
            helperText={formError.password}
          />
          <TextField
            sx={formTextFieldStyles}
            fullWidth
            label='Confirm password'
            variant='outlined'
            type='password'
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            error={!!formError.confirmPassword}
            helperText={formError.confirmPassword}
          />
          <Button variant='outlined' fullWidth onClick={() => handleSubmit()}>
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
