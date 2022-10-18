import './index.css'

import AppBar from '../../common/components/AppBar'
import ProductsGrid from './components/ProductsGrid'

const Store = () => {
  return (
    <div>
      <AppBar />
      <div className='content-wrapper'>
        <ProductsGrid />
      </div>
    </div>
  )
}

export default Store
