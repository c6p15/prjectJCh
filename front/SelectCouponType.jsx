import React from 'react'
import { Link } from 'react-router-dom'


const SelectCouponType = () => {
  return (
    <div>
        <button>
        <Link to='/shopee'>Shopee</Link>
        </button>

        <button>
        <Link to='/lazada'>Lazada</Link>
        </button>
        
    </div>
  )
}

export default SelectCouponType