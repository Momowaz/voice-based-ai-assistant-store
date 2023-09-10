import axios from "axios";
import { url, setHeaders } from "../api";


const PayButton = ({ cartItems, userId }) => {

  const handleCheckout = () => {
    axios.post(
      `${url}/stripe/create-checkout-session`, 
      { cartItems, userId },
      setHeaders()
    )
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((error) => console.log(error.message));
  };

  return (
    <>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default PayButton;