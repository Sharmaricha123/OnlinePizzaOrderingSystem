import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams,Link } from 'react-router-dom';
import './Register.css';
import AdminHome from './AdminHome';

function PizzaManager(){

    const [pizzasList,setPizzasList]=useState([]);
    const {storeId}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8080/pizza/app/admin/${storeId}/view/pizzas`)
                        .then(res=>setPizzasList(res.data))
                        .catch(err=>{
                            if(err==="AxiosError: Network Error")
                            navigate('/serverError');
                            else if(err.response.status === 403)
                            navigate('/error'); 
                        }
                        );
    },[])
    const navigate=useNavigate()
    


    const deletePizza=async (pizzaId)=>{
        const confirmation=window.confirm('do you really want to delete?');
        if(confirmation)
        {
           const res=await axios.get(`http://localhost:8080/pizza/app/admin/delete/pizza/${pizzaId}`);
           console.log(res);
           alert(res.data);
           navigate(`/managePizzas/${storeId}`);
        }
        else
        {
           navigate('/admin');
        }
   };
   const modifyPizza= (pizzaId)=>{
    alert('modify?');
    navigate(`/modify/pizza/${pizzaId}`)
    
   }

   const addPizza= (storeId)=>{
    navigate(`/add/pizza/${storeId}`)
    
   }


    return(
        <div>
        <AdminHome/>
        <div class="form-outline"  style={{margin:"20px 20px"}} > 
       {/* <h5>Add new Pizza??</h5>*/}
        <button className='btn btn-primary'onClick={()=>addPizza(storeId)} >Add Pizza</button>
         </div> 
        <div className='row row-cols-1 row-cols-md-4 g-4' style={{margin:"10px"}}>
                   
        {pizzasList.length === 0 ? (
          <div>
         {/* <h2>Pizzas are not available</h2>*/}
          </div>
        ) :
        
        
        
        
        (
           


            
            pizzasList.map((pizza,index)=>{
                return(
                //   <div className='vcd-box' key={index}>
                //     <h3>{vcd.vcdId}</h3>
                //     <h3>{vcd.name}</h3>
                //     <h3>{vcd.language}</h3>
                //     <h3>{vcd.category}</h3>
                //     <h3>{vcd.rating}</h3>
                //     <h3>{vcd.quantity}</h3>
                //     <h3>{vcd.cost}</h3>
                //     <h3>{vcd.store.storeId}</h3>
                //     <button onClick={()=>deleteVcd(vcd.vcdId)} >Delete Vcd</button>
                //     <button onClick={()=>modifyVcd(vcd.vcdId)} >Modify Vcds</button>
                                    
                // </div>

<div>
                <div className="col h-50"  >
                <div className="card h-50" key={index}>
                <img className="card-img-top" style={{height:"160px"}} src="https://st3.depositphotos.com/1064045/15061/i/450/depositphotos_150614902-stock-photo-unusual-cinema-concept-3d-illustration.jpg" alt="Pizza Time"/> 
                <div className="card-body">
                <h5 className="card-title"><i className="bi bi-disc"></i> {pizza.name}</h5>
                <p className="card-text">
                <h6>#{pizza.pizzaId}</h6>
                {/* <h6>{vcd.name}</h6> */}
                <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
</svg>{pizza.language}</h6>
                <h6><i class="bi bi-tag"></i> {pizza.category}</h6>
                <h6><i className="bi bi-star"></i> {pizza.rating}</h6>
                <h6># {pizza.quantity}</h6>
                <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                      </svg> {pizza.cost}</h6>
                <h6><i class="bi bi-shop"></i> {pizza.store.storeId}</h6>
                </p>
                <button className='btn btn-danger' onClick={()=>deletePizza(pizza.pizzaId)} >Delete Pizza</button>
                <button className='btn btn-info' onClick={()=>modifyPizza(pizza.pizzaId)} >Modify Pizzas</button>
                             
                </div>
                </div>
                </div>
                </div>
                
                )

                })
                
                
                
                )
                
           
           }
        
        
        </div>
        </div>


    )
    
}

export default PizzaManager