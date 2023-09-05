import axios from "axios";
import {useSelector} from "react-redux";
import {url} from "../src/api"

const payButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth)
  
  const handleCheckout = () => {
    axios.post(`${url}/stripe/create-checkout-session`, {
      cartItems,
      userId: user._id
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((error) => console.log(err.message));
  };
  
  return (
    <>
    <button onClick = {() => handleCheckout()}>Checkout</button>
    </>
  )
};

export default payButton;