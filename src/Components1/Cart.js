import { useSelector } from "react-redux";
import "./cart.css";


const Cart = () => {

  let totalAmount = 0;
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <div>
      <div>
        {cartItems.map(cart => {
          totalAmount += cart.price
          return <h1>{cart.description}</h1>
        })}
        <h1>Total : {totalAmount}</h1>
      </div>
    </div>
  );
};
export default Cart;