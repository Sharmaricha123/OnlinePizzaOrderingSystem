import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams,Link } from 'react-router-dom';
import './Register.css';
import AdminHome from './AdminHome';

function PizzaAddAndView(){

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
        const confirmation=window.confirm('Do you really want to delete?');
        if(confirmation)
        {
           const res=await axios.get(`http://localhost:8080/pizza/app/admin/delete/pizza/${pizzaId}`);
           console.log(res);
           alert("Pizza deleted successfully!!!!");
           navigate(`/managePizzas/${storeId}`);
        }
        else
        {
           navigate('/admin');
        }
   };
   const modifyPizza= (pizzaId)=>{
    alert('Do you want to update ?');
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
         <button  style={{color:"#8a1253",borderColor:"#8a1253"}} className='btn btn-light'onClick={()=>addPizza(storeId)} >Add Pizza</button>
          </div> 
        




        <div >
                
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

                
                <button style={{color:"#8a1253",borderColor:"#8a1253"}} className='btn btn-light' onClick={()=>deletePizza(pizza.pizzaId)} >Delete Pizza</button>
                <button style={{color:"#8a1253",borderColor:"#8a1253"}} className='btn btn-light' onClick={()=>modifyPizza(pizza.pizzaId)} >Modify Pizzas</button>
                                    
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

export default PizzaAddAndView