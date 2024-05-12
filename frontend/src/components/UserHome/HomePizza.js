import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams,Link } from 'react-router-dom';
import Home from '../Home';
import Footer from '../Footer';



function HomePizza(){
    const {search}=useParams();
      console.log(search+" ")
      const [pizzasList,setPizzasList]=useState([]);
      useEffect(()=>{
          axios.get(`http://localhost:8080/pizza/app/home/view/allpizzas/${search}`)
              .then(res=>setPizzasList(res.data))
              .catch(err=>{
                if(err=="AxiosError: Network Error")
                navigate('/serverError');
                else if(err.response.status === 403)
                navigate('/error'); 
            });
      },[])
      
      const navigate=useNavigate()
      const addToCart = (pizzaId) => {
          axios
            .post(`http://localhost:8080/pizza/app/home/cart/add/${pizzaId}`, null)
            .then((res) => {
              // Handle success, e.g., show a message or update state
              alert(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              // Handle errors, e.g., show an error message
               if(err.response.status === 403)
               navigate('/error'); 
              console.error(`Error adding PIZZA with ID ${pizzaId} to the cart: ${err.message}`);
              //navigate("/login")
            });
        };
      
  
      return(
        <div>
        <Home/>



        <div >
                <h3>Hey Choose Your Favourite Delicious Pizza!!!!</h3>
                <div className='mt-3'>
                <table className='table'>
                    <thead  >
                        <tr >
                            <th className="th" scope="col">Pizza Id</th>
                            <th scope="col">Pizza Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pizzasList.map((pizza,index)=>{
                            return(
                                <tr key={index}>
                                <td style={{borderColor:"#8a1253",color:"black"}}>{pizza.pizzaId}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{pizza.name}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{pizza.category}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{pizza.cost}</td>
                                    
                                    <td style={{borderColor:"#8a1253",color:"black"}}>
                                        
                                    {/* <Link to={`/updateStore/${store.storeId}`}>Update</Link> */}
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                 {/* <button type="button" className="btn btn-outline-primary" onClick={()=>updateStore(store.storeId)}>Update</button>
                            <button type="button" className="btn btn-outline-danger"onClick={()=>deleteHandler(store.storeId)} >Delete</button>*/}
                                    <button  style={{color:"#8a1253",borderColor:"#8a1253"}} type="button" className="btn btn-light"onClick={()=>addToCart(pizza.pizzaId)} >Add To Cart</button>
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
          </div>
  
      )
      
  }
  
  export default HomePizza