import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryPage = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchUserCoupons = async () => {
      try {
        const res = await axios.get('http://localhost:5500/inventory', {
        });
        setCoupons(res.data);
      } catch (error) {
        console.error('Error fetching user coupons:', error);
      }
    };

    fetchUserCoupons();
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      <ul className="coupon-grid">
        {coupons.map((coupon) => (
          <li key={coupon.coupon_id} className="coupon-item">
            {/* Display coupon details as needed */}
            <p>Code: {coupon.coupon_code}</p>
            <p>Rarity: {coupon.coupon_rarity}</p>
            <p>Expires: {coupon.formatted_expired_date}</p>
            <p>Type: {coupon.coupon_type}</p>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;