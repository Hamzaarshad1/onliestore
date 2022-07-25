import './index.css'

import AppBar from '../../common/components/AppBar'
import ProductsGrid from './components/ProductsGrid'
import FilterRow from './components/FilterRow'

const Store = () => {
  return (
    <div>
      <AppBar />
      <div className='content-wrapper'>
        <FilterRow />
        <ProductsGrid />
      </div>
    </div>
  )
}

export default Store
