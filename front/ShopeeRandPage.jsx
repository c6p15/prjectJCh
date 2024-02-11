import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShopeeRandPage = () => {
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  const handleRandomize = () => {
    axios.get('http://localhost:5500/shopee-randomizer')
      .then(res => {
        if (res.data.message) {
          setError(res.data.message);
        } else {
          setCoupon(res.data);
          setError(null);
        }
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred while fetching the coupon.");
      });
  };

  return (
    <div>
      <h2>Shopee's Coupon Randomizer Page</h2>
      {error ? (
        <p>{error}</p>
      ) : coupon ? (
        <div>
          <p>Code: {coupon.coupon_code}</p>
          <p>Rarity: {coupon.coupon_rarity}</p>
          <p>Type: {coupon.coupon_type}</p>
          <p>Expires on: {coupon.formatted_expired_date}</p>
        </div>
      ) : (
        <p>Click the "Randomize" button to get a coupon.</p>
      )}
      <button onClick={handleRandomize}>Randomize</button>
      <button>
        <Link to='/addcoupon'>Add coupon</Link>
      </button>
      
    </div>
  );
};

export default ShopeeRandPage;
