import './App.css';
import SpeechAI from './components/speechAI';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductsByCategory from './pages/ProductsByCategory';
import Profile from './components/Profile';
import Nav from './components/Nav';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import CheckoutSuccess from './components/checkoutSuccess';
import SearchResults from './pages/SearchResults';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
      <Nav/>
      <Routes>
      <Route path='/' exact element={<Home/>} />
        <Route path='/Categories' exact element={<Categories/>} />
        <Route path='/Products' element={<Products/>} />
        <Route path="/products/:category_id" element={<ProductsByCategory />} />
        <Route path="/product/:product_id" element={<ProductDetails />} />
        <Route path='/SpeechAI' element={<SpeechAI/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path="/pages/AdminLogin" element={<AdminLogin/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>} />
        <Route path='/search-results' element={<SearchResults/>} />
      </Routes>
      <Footer />
    </Router>
    
  );
}
export default App;
