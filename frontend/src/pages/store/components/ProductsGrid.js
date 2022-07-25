import { Button, Card, CardContent, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CART_API_PATH, PRODUCTS_API_PATH } from '../../../config'
import UserContext from '../../../UserContext'

const ProductsGrid = () => {
  const [productList, setProductList] = useState([])

  const getProducts = async () => {
    try {
      const { data } = await axios.get(PRODUCTS_API_PATH)
      setProductList(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Grid container spacing={2}>
      {productList.map((product, index) => {
        if (product.available) {
          return (
            <Grid key={index} item xs={4}>
              <ProductCard product={product} />
            </Grid>
          )
        }
        return null
      })}
    </Grid>
  )
}

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    description,
    price,
    display_image: displayImage
  } = product

  const { user } = useContext(UserContext)

  const [isShowMore, setIsShowMore] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [error, setError] = useState('')

  const handleAdd = async () => {
    if (!quantity) {
      setError('Please enter quantity')
      return
    }
    try {
      // Get previous cart items
      const { data } = await axios.get(CART_API_PATH, {
        params: { userId: user.userId }
      })
      let products = []
      if (data && data.products?.length) {
        products = data.products
      }

      // Create new cart array
      const productIndex = products.findIndex(
        ({ _id: productId }) => productId === _id
      )
      if (productIndex !== -1) {
        products[productIndex].quantity += parseInt(quantity)
      } else {
        products = [
          ...products,
          { productId: _id, quantity: parseInt(quantity) }
        ]
      }

      // POST new product array
      await axios.post(CART_API_PATH, {
        userid: user.userId,
        products
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card>
      <CardContent>
        <img className='product-image' src={displayImage} alt='' />
        <div className='title'>{title}</div>
        <div className='price'>{`${price.value} ${price.currency}`}</div>
        <div className={`description${isShowMore ? ' show-full' : ''}`}>
          {description}
        </div>
        <div
          className='show-more-button'
          onClick={() => setIsShowMore(!isShowMore)}
        >
          {isShowMore ? 'Show less' : 'Show more'}
        </div>
        <TextField
          sx={{ margin: '16px 0' }}
          fullWidth
          id='outlined-basic'
          label='Select quantity'
          variant='outlined'
          value={quantity}
          onChange={event => setQuantity(event.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button fullWidth variant='contained' onClick={() => handleAdd()}>
          Add to basket
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductsGrid
