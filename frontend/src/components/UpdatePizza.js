import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import './Register.css';
import AdminHome from './AdminHome';

function UpdatePizza(){
    const navigate=useNavigate();
    const [pizza,setPizza]=useState({
            pizzaId:0,
            name:'',
            category:'',
           
            quantity:'',
            store:{},
            cost:0,
           
    })
    
    const savePizzaDetails=(e)=>{
        setPizza({...pizza,[e.target.name]:e.target.value})
        
    }
   
    const [response,setResponse] = useState('');
    const {pizzaId}=useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/pizza/app/admin/view/pizza/${pizzaId}`)
      .then(res => {setPizza(res.data)})
      .catch(err => {
        if(err=="AxiosError: Network Error")
        navigate('/serverError');
        else if(err.response.status === 403)
        navigate('/error'); 
    });
  }, [pizzaId]); // Include storeId in the dependency array to fetch data when it changes
  const submitHandler=async (e)=>{
    e.preventDefault();
    console.log(pizza);
   // alert('do you want to add vcd??')
   const payLoad={
    pizzaId:pizza.pizzaId,
    name:pizza.name,
    category:pizza.category,
    
    quantity:pizza.quantity,
    store:pizza.store,
    cost:pizza.cost,
    
   }
   try {
    const response = await axios.post(`http://localhost:8080/pizza/app/admin/update/pizza/${pizzaId}`,payLoad, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data ==='pizza updated successfully') {
        setResponse(response.data);
        alert('Pizza updated Successfully!!!!')
        navigate(`/managePizzas/${pizza.store.storeId}`)
      } 
      else {
        setResponse('An error occurred while updating vcd');
        console.log(response)
        alert(response.data);
        navigate(`/managePizzas/${pizza.store.storeId}`);
      }
       console.log(response.data);
       console.log(pizza)
    } catch (error) {
      if(error=="AxiosError: Network Error")
      navigate('/serverError');
      else if(error.response.status === 403)
      navigate('/error'); 
      setResponse('An error occurred. Please try again later.');
      // console.log(error);
      // navigate("/admin");
    }
}



    return(
            
      <div>
            <AdminHome/>
        
        <div className='container'>
         <h3>Update Pizza</h3>
         <header>
        <form onSubmit={submitHandler}  className='form'>
        <label style = {{color:"black"}} htmlFor='storeId'>Store Id</label>
        <input id="storeId" name='storeId' type='number'  className='input-box' value={pizza.store.storeId} readOnly></input>
        <label style = {{color:"black"}} htmlFor='pizzaId'>Pizza Id</label>
        <input id="pizzaId" name='pizzaId' type='number'  className='input-box' value={pizza.pizzaId} readOnly></input>
        

        <label style = {{color:"black"}} htmlFor='name'>Name</label>
        <input id="name" name='name' type='text' className='input-box'  value={pizza.name} onChange={savePizzaDetails} required></input>
        <label style = {{color:"black"}} htmlFor='category'>Category</label>
        <input id="category" name='category' type='text'className='input-box' value={pizza.category} onChange={savePizzaDetails}  required></input>
        
        <label  style = {{color:"black"}} htmlFor='quantity'>Quantity</label>
        <input id="quantity" name='quantity' type='number'className='input-box' value={pizza.quantity} onChange={savePizzaDetails} required></input>
        <label style = {{color:"black"}} htmlFor='cost'>Cost</label>
        <input id="cost" name='cost' type='number'  className='input-box' value={pizza.cost} onChange={savePizzaDetails}  required></input>
        <input type='submit'style={{color:"#8a1253",borderColor:"#8a1253"}} className='btn btn-light'></input>
    </form>
    </header>
      </div>
      
    </div>
         
    )
    
}

export default UpdatePizza