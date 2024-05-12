import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import './Register.css';


function UpdateStore(){
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
    const saveStoreDetails=(e)=>{
        setStore({...store,[e.target.name]:e.target.value})
        
    }
    const saveAddressDetails=(e)=>{
        setAddr({...addr,[e.target.name]:e.target.value})
        //console.log(address)
    }
    const [response,setResponse] = useState('');
    const {storeId}=useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/pizza/app/admin/view/store/${storeId}`)
      .then(res => {setStore(res.data);setAddr(res.data.address)})
      .catch(err => {
        if(err=="AxiosError: Network Error")
        navigate('/serverError');
        else if(err.response.status === 403)
        navigate('/error'); 
    });
  }, [storeId]); // Include storeId in the dependency array to fetch data when it changes
   const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(addr)
   
    // console.log(store);
    const payLoad = {
    storeId: store.storeId, // Include the storeId in the payload
    name: store.name,
    address: {
      locality: addr.locality,
      place: addr.place,
      state: addr.state,
      zipcode: addr.zipcode,
    },
    phoneNo: store.phoneNo
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/pizza/app/admin/update/store/${storeId}`, payLoad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data ==='store updated successfully') {
        setResponse(response.data);
        // alert("Do you want to update the store?")
        window.confirm("Do you want to update the store?")
        alert('Store Updated Successfully')
        navigate("/viewStores")
      } 
      else {
        setResponse('An error occurred while updating');
        console.log('new')
        console.log(response)
        navigate("/home");
      }
       console.log(response.data);
       console.log(payLoad)
    } catch (error) {
      setResponse('An error occurred. Please try again later.');
      if(error=="AxiosError: Network Error")
      navigate('/serverError');
      else if(error.response.status === 403)
        navigate('/error'); 
    }
  };

    return(
        
        <div className='container'>
        <h3>Update Store</h3>
        <div className='mt-3'>
        <form onSubmit={submitHandler} className='form'>
        <label htmlFor='storeId'>Store Id</label>
        <input id="storeId" name='storeId' type='number' className='input-box' value={store.storeId} readOnly></input>

        <label style = {{color:"black"}} htmlFor='storeName'>Store Name</label>
        <input id="storeName" name='name' type='text'className='input-box' value={store.name} onChange={saveStoreDetails} required></input>

        <label style = {{color:"black"}} htmlFor='locality'>Locality</label>
        <input id="locality" name='locality' type='text' className='input-box'  value={addr.locality} onChange={saveAddressDetails} required></input>

        <label style = {{color:"black"}} htmlFor='place'>Place</label>
        <input id="place" name='place' type='text'className='input-box' value={addr.place} onChange={saveAddressDetails}required></input>
  
        <label style = {{color:"black"}} htmlFor='state'>State</label>
        <input id="state" name='state' type='text'className='input-box' value={addr.state} onChange={saveAddressDetails}required></input>
  

        <label style = {{color:"black"}} htmlFor='zipcode'>Zipcode</label>
        <input id="zipcode" name='zipcode' type='text'className='input-box' value={addr.zipcode} onChange={saveAddressDetails}required></input>
  
        <label style = {{color:"black"}} htmlFor='phoneNo'>Contact number</label>
        <input id="phoneNo" name='phoneNo' type='number'  className='input-box' value={store.phoneNo} onChange={saveStoreDetails}required></input>

        
       

        <input type='submit' className='button'></input>
    </form>
       </div>
      </div>
    
         
    )
    
}

export default UpdateStore