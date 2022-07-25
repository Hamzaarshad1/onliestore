import { Card, CardContent, List, ListItem } from '@mui/material'

const OrderBasket = ({ items = [] }) => {
  if (items.length) {
    return (
      <List>
        {items.map(({ product, quantity }, index) => {
          return (
            <ListItem key={index} disablePadding>
              <Card sx={{ width: '100%', marginTop: '8px' }}>
                <CardContent>
                  <div className='checkout-details'>
                    <img
                      className='checkout-item-image'
                      src={product.display_image}
                      alt=''
                    />
                    <div className='checkout-item-quantity'>{`${quantity} x ${product.title}`}</div>
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          )
        })}
      </List>
    )
  } else {
    return (
      <div className='no-items-alert'>
        Woops! There are no items in your basket
      </div>
    )
  }
}

export default OrderBasket
