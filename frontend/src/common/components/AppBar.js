import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useContext } from 'react'
import UserContext from '../../UserContext'
import { useNavigate } from 'react-router-dom'

const ButtonAppBar = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser({})
    window.localStorage.removeItem('access-token')
    handlePathChange('/')
  }

  const handlePathChange = newPath => {
    navigate(newPath)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handlePathChange('/')}
          >
            Store
          </Typography>
          {/* Might change to menu */}
          <Button color='inherit' onClick={() => handlePathChange('/checkout')}>
            Basket
          </Button>
          <Button
            color='inherit'
            onClick={() => handlePathChange('/order-history')}
          >
            History
          </Button>
          <Button color='inherit' onClick={() => handleLogout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ButtonAppBar
