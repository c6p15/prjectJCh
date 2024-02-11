import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    coupon_code: '',
    coupon_rarity: null,
    coupon_type: '',
    expired_date: '',
  });

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5500/addcoupon', coupon);
      navigate("/")
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div>
      <h2>Add Coupon</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="coupon_code">Coupon Code:</label>
        <input
          type="text"
          id="coupon_code"
          name="coupon_code"
          value={coupon.coupon_code}
          onChange={handleChange}
          required
        />

        <label htmlFor="coupon_rarity">Coupon Rarity:</label>
        <select
          id="coupon_rarity"
          name="coupon_rarity"
          value={coupon.coupon_rarity}
          onChange={handleChange}
          required
        >
          <option value="">Select rarity</option>
          {[1, 2, 3, 4, 5].map(rarity => (
            <option key={rarity} value={rarity}>{rarity}</option>
          ))}
        </select>

        <label htmlFor="coupon_type">Coupon Type:</label>
        <select
          id="coupon_type"
          name="coupon_type"
          value={coupon.coupon_type}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          {['Lazada', 'Shopee'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <label htmlFor="expired_date">Expiration Date:</label>
        <input
          type="date"
          id="expired_date"
          name="expired_date"
          value={coupon.expired_date}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
