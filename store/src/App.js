import './App.css';
import SpeechAI from './components/speechAI';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Login from './components/Login';
import ProductsByCategory from './pages/ProductsByCategory';
import Profile from './components/profile';
import Nav from './components/Nav';
import ProductDetails from './pages/ProductDetails';


function App() {

  return (
    <Router>
      <Nav/>
      <Routes>
      <Route path='/Home' exact element={<Home/>} />
        <Route path='/Categories' exact element={<Categories/>} />
        <Route path='/Products' element={<Products/>} />
        <Route path="/products/:category_id" element={<ProductsByCategory />} />
        <Route path="/product/:product_id" element={<ProductDetails />} />
        <Route path='/SpeechAI' element={<SpeechAI/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
    
  );
}
export default App;
