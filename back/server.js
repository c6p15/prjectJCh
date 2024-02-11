import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "randomcoupon"
});

app.use(express.json());
app.use(cors());

app.get('/coupons' , (req,res) => {
    const q = "SELECT * FROM coupons"
    db.query(q, (err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/shopee-randomizer', (req, res) => {
  const q = "SELECT coupon_id, coupon_code, coupon_type, coupon_rarity, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date FROM coupons WHERE coupon_status = 'available' AND coupon_type = 'Shopee'";
  db.query(q, (err, coupons) => {
    if(err) return res.json(err);
    if (coupons.length === 0) {
      return res.json({ message: "No coupons available." });
    }

    let totalWeight = 0;
    for(let coupon of coupons) {
      totalWeight += (6 - coupon.coupon_rarity); 
    }

    let randomNum = Math.random() * totalWeight;
    let selectedCoupon;
    for(let coupon of coupons) {
      randomNum -= (6 - coupon.coupon_rarity);
      if(randomNum <= 0) {
        selectedCoupon = coupon;
        break;
      }
    }

    const updateQuery = "UPDATE coupons SET coupon_status = 'owned' WHERE coupon_id = ?";
    db.query(updateQuery, [selectedCoupon.coupon_id], (err, result) => {
      if(err) return res.json(err);
      res.json(selectedCoupon);
    });
  });
});

app.get('/lazada-randomizer', (req, res) => {
  const q = "SELECT coupon_id, coupon_code, coupon_type, coupon_rarity, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date FROM coupons WHERE coupon_status = 'available' AND coupon_type = 'Lazada'";
  db.query(q, (err, coupons) => {
    if(err) return res.json(err);
    if (coupons.length === 0) {
      return res.json({ message: "No coupons available." });
    }

    let totalWeight = 0;
    for(let coupon of coupons) {
      totalWeight += (6 - coupon.coupon_rarity); 
    }

    let randomNum = Math.random() * totalWeight;
    let selectedCoupon;
    for(let coupon of coupons) {
      randomNum -= (6 - coupon.coupon_rarity);
      if(randomNum <= 0) {
        selectedCoupon = coupon;
        break;
      }
    }

    const updateQuery = "UPDATE coupons SET coupon_status = 'owned' WHERE coupon_id = ?";
    db.query(updateQuery, [selectedCoupon.coupon_id], (err, result) => {
      if(err) return res.json(err);
      res.json(selectedCoupon);

    });
  });
});


app.get('/inventory' , (req,res) => {
    const q = "SELECT coupon_id, coupon_code, coupon_rarity, coupon_type, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date FROM coupons WHERE coupon_status = 'owned'"
    
    db.query(q, (err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/addcoupon', (req, res) => {
  const { coupon_code, coupon_type, coupon_rarity, expired_date } = req.body;

  if (!coupon_code || !coupon_type || !coupon_rarity || !expired_date) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const q = "INSERT INTO coupons (coupon_code, coupon_type, coupon_rarity, expired_date, coupon_status) VALUES (?, ?, ?, ?, 'available')";
  db.query(q, [coupon_code, coupon_type, coupon_rarity, expired_date], (err, result) => {
    if (err) return res.json(err);

    res.json({ message: 'Coupon added successfully.' });
  });
});

  
app.listen(5500 , () => console.log(`Conneted to server 5500`))