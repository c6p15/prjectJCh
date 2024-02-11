import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopeeRandPage from "./pages/ShopeeRandPage";
import LazadaRandPage from "./pages/LazadaRandPage";
import InventoryPage from "./pages/InventoryPage";
import AddCoupon from "./pages/AddCoupon";
import SelectCouponType from "./pages/SelectCouponType";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SelectCouponType/>}/>
        <Route path='/inventory' element={<InventoryPage/>}/>
        <Route path='/addcoupon' element={<AddCoupon/>}/>
        <Route path='/shopee' element={<ShopeeRandPage/>}/>
        <Route path='/lazada' element={<LazadaRandPage/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;