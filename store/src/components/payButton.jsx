import axios from "axios";
import {useSelector} from "react-redux";
import {url} from "../src/api"

const payButton = ({ cartItems }) => {
  const handleCheckout = () => {
    console.log(cartItems);
    }
  
  return (
    <>
    <button onClick = {() => handleCheckout()}>Checkout</button>
    </>
  )
};

export default payButton;