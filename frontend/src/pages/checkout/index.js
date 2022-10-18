import './index.css'

import AppBar from '../../common/components/AppBar'
import OrderBasket from './components/OrderBasket'
import { Button, Card, CardContent, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CURRENCY, TAX_PERCENTAGE } from '../../config'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import { getCart, getSingleProduct, postOrder } from '../../apiHelper'

const checkoutElementStyles = {
  marginTop: 3
}

const Checkout = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const getBasketAndTotal = async () => {
    try {
      const { data } = await getCart(user.accessToken)
      if (data && data.products.length) {
        // Populate products
        const itemPromises = data?.products?.map(({ productId }) => {
          return getSingleProduct(user.accessToken, productId)
        })
        const responses = await Promise.all(itemPromises)

        // Get items for cart
        const items = []
        let total = 0
        for (const index in responses) {
          const product = responses[index].data
          const quantity = data.products[index].quantity
          items.push({
            product,
            quantity
          })
          total += product.price.value * quantity
        }
        setItems(items)
        setTotal((total * (100 + TAX_PERCENTAGE)) / 100)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBasketAndTotal()
  }, [])

  const handleCheckout = async () => {
    if (!address) {
      setError('Please enter a valid Address')
      return
    }
    try {
      await postOrder(user.accessToken, {
        userId: user.userId,
        products: items.map(({ product, quantity }) => ({
          productId: product._id,
          quantity: quantity
        })),
        address,
        amount: total
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <AppBar />
      <div className='content-wrapper'>
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <OrderBasket items={items} />

            {items?.length ? (
              <>
                <div className='tax-info'>{`Applied tax: ${TAX_PERCENTAGE}%`}</div>
                <div className='total-info'>{`Total amount: ${total} ${CURRENCY}`}</div>
              </>
            ) : null}

            <TextField
              sx={checkoutElementStyles}
              fullWidth
              variant='outlined'
              label='Address'
              value={address}
              onChange={event => setAddress(event.target.value)}
              error={!!error}
              helperText={error}
            />

            <Button
              sx={checkoutElementStyles}
              variant='contained'
              fullWidth
              onClick={() => handleCheckout()}
              disabled={!items?.length}
            >
              Checkout
            </Button>
            <Button
              sx={checkoutElementStyles}
              variant='outlined'
              fullWidth
              onClick={() => navigate('/')}
            >
              Back to store
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Checkout
