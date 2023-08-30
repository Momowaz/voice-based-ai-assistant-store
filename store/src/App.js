// import './App.css';
import SpeechAI from './components/speechAI';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import Categories from './components/Categories';
import Profile from './components/profile';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
      <Route path='/Home' exact element={<Home/>} />
        <Route path='/Categories' exact element={<Categories/>} />
        <Route path='/Products' element={<Products/>} />
        <Route path='/SpeechAI' element={<SpeechAI/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
  );
}
export default App;
