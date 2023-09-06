import axios from "axios";
// import {useSelector} from "react-redux";
import {url} from "../src/api";


const PayButton = ({ cartItems, userId }) => {

  const handleCheckout = () => {
    axios.post(`${url}/stripe/create-checkout-session`, {
      cartItems,
      userId,
    })
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