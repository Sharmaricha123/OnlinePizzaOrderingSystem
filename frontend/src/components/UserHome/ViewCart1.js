import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PlaceOrder from './PlaceOrder';
import Home from '../Home';

function ViewCart() {
  const [cartList, setCartList] = useState([]);
  const userId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/pizza/app/home/cart/view`)
      .then((res) => setCartList(res.data))
      .catch((err) => {
        //console.log(err)
        if(err=="AxiosError: Network Error")
          navigate('/serverError');
        else if(err.response.status === 403)
        navigate('/error'); 
      });
  });
  let disabledButton=false;
  if(cartList.length===0)
  {disabledButton=true}

  const removeFromCart=async (cartId)=>{
    const res=await axios.get(`http://localhost:8080/pizza/app/home/cart/delete/${cartId}`);
    console.log(res);
    alert('pizza removed from cart')
    navigate('/userHome/cart');

  }
  const handlePlaceOrder = () => {
    // alert("dsal");
    console.log(cartList)
    navigate('/userHome/placeOrder', { state: {cartItems:cartList } });
  };
  return (
    <div>
       <Home/>
       





       <div >
       <h3>Hey Choose Your Favourite Delicious Pizza!!!!</h3>
       <div className='mt-3'>
       <table className='table'>

      
           <thead  >
               <tr >
                   <th className="th" scope="col">Cart Id</th>
                   <th scope="col">Pizza Name</th>
                   <th scope="col">Category</th>
                   <th scope="col">Price</th>
                   <th scope="col">Delete From Cart</th>
                  
                   
               </tr>
           </thead>
           <tbody>
               {
                   cartList.map((cart,index)=>{
                   return(
                       <tr key={index}>
                       <td style={{borderColor:"#8a1253",color:"black"}}>{cart.cartId}</td>
                           <td style={{borderColor:"#8a1253",color:"black"}}>{cart.pizza.name}</td>
                           <td style={{borderColor:"#8a1253",color:"black"}}>{cart.pizza.category}</td>
                           <td style={{borderColor:"#8a1253",color:"black"}}>{cart.pizza.cost}</td>
                           
                           <td style={{borderColor:"#8a1253",color:"black"}}>
                           
                               
                           {/* <Link to={`/updateStore/${store.storeId}`}>Update</Link> */}
                           <div className="btn-group" role="group" aria-label="Basic outlined example">


                           <button  style={{color:"#8a1253",borderColor:"#8a1253"}} className='btn btn-light'  onClick={()=>removeFromCart(cart.cartId)} >Remove From Cart</button> 

                         
                        {/* <button type="button" className="btn btn-outline-primary" onClick={()=>updateStore(store.storeId)}>Update</button>
                   <button type="button" className="btn btn-outline-danger"onClick={()=>deleteHandler(store.storeId)} >Delete</button>*/}
                          
                           </div>
                           </td>
                         
                       </tr>

                      


                   )
                   })
               }
           </tbody>



       </table>



       </div>


   </div>

   <button type="button" class="btn btn-light" style={{color:"#8a1253",borderColor:"#8a1253"}}  onClick={()=>{navigate(`/userHome/pizzas/${undefined}`)}} >Shop Now</button>
   <button disabled={disabledButton}  type="button" onClick={()=>handlePlaceOrder()} style={{color:"#8a1253",borderColor:"#8a1253"}}  className="btn light">Place Order</button>
      </div>
  );
}
export default ViewCart;
