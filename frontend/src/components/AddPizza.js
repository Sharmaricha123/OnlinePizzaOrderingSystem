import React,{ useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import AdminHome from './AdminHome';

function AddPizza(){


    const [response,setResponse]=useState('');
    const {storeId}=useParams()
    const navigate=useNavigate()
    const [pizza,setPizza]=useState({
        vname:'',
        category:'',
        rating:'',
        quantity:'',
        storeId:storeId,
        cost:0,
        language:'',
    })

    const savePizzaDetails=(e)=>{
        setPizza({...pizza,[e.target.name]:e.target.value})

    }



    const submitHandler=async (e)=>{
        e.preventDefault();
        console.log(pizza);
       // alert('do you want to add vcd??')
       const payLoad={
        name:pizza.vname,
        category:pizza.category,
        quantity:pizza.quantity,
        storeId:storeId,
        cost:pizza.cost,
       }
       try {
        const response = await axios.post(`http://localhost:8080/pizza/app/admin/${storeId}/add/pizza`,payLoad, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data ==='pizza added successfully') {
            setResponse(response.data);
            alert('Pizza added successfully!!!!!')
            navigate(`/managePizzas/${storeId}`)
          } 
          else {
            setResponse('Pizza already exists in this store');
            console.log(response)
            navigate(`/add/pizza/${storeId}`)
           
          }
           console.log(response.data);
           console.log(pizza)
        } catch (error) {
          if(error==="AxiosError: Network Error")
          navigate('/serverError');
          else if(error.response.status === 403)
          navigate('/error'); 
          setResponse('An error occurred. Please try again later.');
          console.log(error);
          navigate("/viewStores");
        }
        


    }

return(

   <div>
<AdminHome/>
  <body>
<div className='container' style={{marginTop:"15px"}}>
      <header >Add Pizza<br></br>
      <span style={{color:"red",textAlign:"center"}}>{response}</span>
      </header>
      <form onSubmit={submitHandler} className='form'>
<label style = {{color:"black"}} htmlFor='storeId'>Store Id</label>
<input id="storeId" name='storeId' type='number'  className='input-box' value={storeId} readOnly></input>

<label style = {{color:"black"}} htmlFor='name'>Name</label>
<input id="name" name='vname' type='text' className='input-box'  onChange={savePizzaDetails} required></input>
<label style = {{color:"black"}} htmlFor='category'>Category</label>
<input id="category" name='category' type='text'className='input-box' onChange={savePizzaDetails}  required></input>

<label style = {{color:"black"}} htmlFor='quantity'>Quantity</label>
<input id="quantity" name='quantity' type='number'className='input-box' onChange={savePizzaDetails} required></input>
<label style = {{color:"black"}} htmlFor='cost'>Cost</label>
<input id="cost" name='cost' type='number'  className='input-box' onChange={savePizzaDetails}  required></input>
<input type='submit' className='button'></input>
</form>
</div> 
</body>
</div>
)

}

export default AddPizza