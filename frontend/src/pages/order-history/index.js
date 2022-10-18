import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getOrderHistory } from '../../apiHelper'
import AppBar from '../../common/components/AppBar'
import { CURRENCY } from '../../config'
import UserContext from '../../UserContext'

const OrderHistory = () => {
  const { user } = useContext(UserContext)
  const [orderList, setOrderList] = useState([])

  const getOrderList = async () => {
    try {
      const { data } = await getOrderHistory(user.accessToken)
      setOrderList(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOrderList()
  }, [])

  return (
    <div>
      <AppBar />
      <div className='content-wrapper'>
        <div>
          <div className='page-heading'>Order History</div>
          <TableContainer sx={{ minWidth: '800px' }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Number of items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map((order, index) => {
                  const products = order.products || []
                  let numberOfItems = 0
                  for (const { quantity } of products) {
                    numberOfItems += quantity
                  }
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{numberOfItems}</TableCell>
                      <TableCell>{`${order.amount} ${CURRENCY}`}</TableCell>
                      <TableCell>
                        {order.status === 'success' ? 'Successful' : 'Failed'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
