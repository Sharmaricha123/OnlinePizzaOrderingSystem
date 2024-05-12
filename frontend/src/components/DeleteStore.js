import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams,Link } from 'react-router-dom';
import '../index.css';
import AdminHome from './AdminHome';
import Footer from './Footer';

function DeleteStore(){

    const [storesList,setStoreList]= useState([]);
    const response = '';
    const {storeId}=useParams();
    const {search}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8080/pizza/app/admin/view/stores/${search}`)
                        .then(res=>setStoreList(res.data))
                        .catch(err=>{
                        //console.log(err.response.status);
                        console.log(err+"mee")
                          if(err=="AxiosError: Network Error")
                          navigate('/serverError');
                         else if(err.response.status === 403)
                          navigate('/error'); 
                        });
    },[])
    // const [deleteUrl,setDeleteUrl]=useState('');


    //deleting stores
    const deleteHandler=async (storeId)=>{
        const confirmation=window.confirm('Do you want to delete?');
        if(confirmation)
        {
           const res=await axios.get(`http://localhost:8080/pizza/app/admin/delete/store/${storeId}`);
           console.log(res);
           navigate('/viewStores');
        }
        else
        {
           navigate('/viewStores');
        }
   };
   const updateStore=(storeId)=>{
    navigate(`/updateStore/${storeId}`);
   }
   const pizzaManager=(storeId)=>{
    navigate(`/managePizzas/${storeId}`);
   }

   console.log(storesList)
    return(
            <div>
            <AdminHome/>
            <div >
                <h3>Stores List</h3>
                <div className='mt-3'>
                <table className='table'>
                    <thead  >
                        <tr >
                            <th className="th" scope="col">Store Id</th>
                            <th scope="col">Store Name</th>
                            <th scope="col">Locality</th>
                            <th scope="col">Place</th>
                            <th scope="col">State</th>
                            <th scope="col">Zipcode</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storesList.map((store,index)=>{
                            return(
                                <tr key={index}>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.storeId}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.name}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.address.locality}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.address.place}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.address.state}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.address.zipcode}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>{store.phoneNo}</td>
                                    <td style={{borderColor:"#8a1253",color:"black"}}>
                                        
                                    {/* <Link to={`/updateStore/${store.storeId}`}>Update</Link> */}
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                  {/*  <button type="button" className="btn btn-outline-primary" onClick={()=>updateStore(store.storeId)}>Update</button> */}
                                    <button type="button" style={{color:"#8a1253",borderColor:"#8a1253"}} className="btn btn-light"onClick={()=>deleteHandler(store.storeId)} >Delete</button>
                                  {/* <button type="button" className="btn btn-outline-info"onClick={()=>pizzaManager(store.storeId)} >Manage Pizzas</button>*/}
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

export default DeleteStore