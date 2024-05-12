import React,{useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Register.css';
import AdminHome from './AdminHome';


function AddStore(){

    const navigate=useNavigate();
    const [store,setStore]=useState({
        sname:'',
        address:{},
        phoneNo:0
    })
    

    const [addr,setAddr]=useState({
        locality:'',
        place:'',
        state:'',
        zipcode:0
    })
    const {name,address,phoneNo}=store
    const {locality,place,state,zipcode}=addr
    const [response,setResponse] =useState('');
    const saveStoreDetails=(e)=>{
        setStore({...store,[e.target.name]:e.target.value})
        
    }
    const saveAddressDetails=(e)=>{
        setAddr({...addr,[e.target.name]:e.target.value})
        //console.log(address)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(addr)
        

        const payLoad = {
            name:store.sname,
            address:addr,
            phoneNo:store.phoneNo
        };
      
        try {
          const response = await axios.post('http://localhost:8080/pizza/app/admin/add/store', payLoad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.data ==='store added successfully') {
            setResponse(response.data);
            alert(response.data)
            navigate("/viewStores")
          } else if (response.data === 'store already exists') {
            setResponse('Store already exists!!!!!');
            navigate("/addStore");
          }
          else {
            setResponse('An error occurred');
            navigate("/admin");
          }
           console.log(response.data);
           console.log(payLoad)
        } catch (error) {
          if(error=="AxiosError: Network Error")
          navigate('/serverError');
          else if(error.response.status === 403)
          navigate('/error'); 
          // setResponse('An error occurred. Please try again later.');
          // console.log(error);
          // navigate("/admin");
        }
      };
      
return(
    <body>
    <AdminHome/>
    <main>  
    <div className='container'>
      <header>Add Store<br></br>
      <span style={{color:"#8a1253"}}>{response}</span>
      </header>
    <form onSubmit={submitHandler} className='form'>
        <label style = {{color:"black"}} htmlFor='name'>Name</label>
        <input  id="name" name='sname' type='text' className='input-box' onChange={saveStoreDetails} required></input>

        <label style = {{color:"black"}} htmlFor='locality'>Locality</label>
        <input id="locality" name='locality' type='text'className='input-box' onChange={saveAddressDetails}  required></input>

        <label style = {{color:"black"}} htmlFor='place'>Place</label>
        <input id="place" name='place' type='text'className='input-box' onChange={saveAddressDetails} required></input>
  

        <label style = {{color:"black"}} htmlFor='state'>State</label>
        <input id="state" name='state' type='text' className='input-box' onChange={saveAddressDetails} required></input>

        <label style = {{color:"black"}} htmlFor='zipcode'>zipcode</label>
        <input id="zipcode" name='zipcode' className='input-box' onChange={saveAddressDetails} required></input>
  

        <label style = {{color:"black"}} htmlFor='phoneNo'>Contact number</label>
        <input id="phoneNo" name='phoneNo' type='number'  className='input-box' onChange={saveStoreDetails}  required></input>

        
        

        <input type='submit' className='button' style={{color:"#8a1253"}}></input>
    </form>
    </div>  
    </main>
    </body>
)

}

export default AddStore