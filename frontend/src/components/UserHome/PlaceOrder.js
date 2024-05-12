import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useHistory } from 'react-router-dom';


function PlaceOrder({ cartItems }) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate=useNavigate();
  const history=useNavigate();
  const cartIds=cartItems.map((cart) => cart.cartId)
  // let nocart;
  // if(cartItems.length===0)
  const [orderId,setOrderId]=useState();
  useEffect(() => {

    const stopBack = () => {

      window.history.pushState(null, null, window.location.href);

      window.onpopstate = function (event) {

        window.history.go(1);

      };

    };

    stopBack();

  }, []);

  const handleCancelOrder =async ()=>{
      const res=await axios.get(`http://localhost:8080/pizza/app/home/cancel-order/${orderId}`);
      console.log(res);
      // alert('vcd removed from cart')
      navigate('/userHome/cart');
  
    // /home/cancel-order/{orderId}

  }
  
  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    axios
      .post(`http://localhost:8080/pizza/app/home/place-order`, {
        cartIds
      })
      .then((response) => {

        setOrderId(response.data)

        console.log('Order placed successfully!', response.data);
        setIsPlacingOrder(true);
       navigate(`/userHome/payment/${response.data}`); 
      })
      .catch((error) => {
        if(error=="AxiosError: Network Error")
          navigate('/serverError');
        else{
        console.error('Error placing the order:', error);
        setIsPlacingOrder(false);
        }
      });
  };
  return (
    <div>
      <h2>Place Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>PIZZA Name</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cart) => (
            <tr key={cart.cartId}>
              <td>{cart.pizza.name}</td>
              <td>{cart.pizza.quantity}</td>
              <td>{cart.pizza.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        style={{color:"#8a1253",borderColor:"#8a1253"}}
        className="btn btn-light">
        {isPlacingOrder ? 'Placing order..' : 'Confirm Order'}
      </button>
      <button  style={{color:"#8a1253",borderColor:"#8a1253"}} onClick={handleCancelOrder} className="btn btn-light">

       Cancel Order

       </button>
   
       </div>
  );
}

export default PlaceOrder;
