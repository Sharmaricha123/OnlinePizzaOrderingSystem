import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


function Payment(){
    const [order,setOrder]=useState({
        orderId:0,
        totalCost:0
    })
    const {orderId}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/pizza/app/home/order/${orderId}`)
          .then(res => {
            console.log(res.data)
            setOrder(res.data)})
          .catch(err => {
            if(err.response.status === 403)
            navigate('/error'); 
        });
    }, orderId);
    const [crdeitCard,setCreditCard]=useState({
      creditCardNumber:0,
      validDate:0,
      cvv:0
  })
  const saveCard=(e)=>{
    setCreditCard({...crdeitCard,[e.target.name]:e.target.value})
    //console.log(address)
}
    const payHandler=async (e) => {
      e.preventDefault();
      // console.log(addr)
      try {
        const response = await axios.post(`http://localhost:8080/pizza/app/home/order/${orderId}/pay`, crdeitCard, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
       alert("Payment Successful!!Enjoy Watching..");
       navigate("/finalpage")
      //  navigate("/userHome");

      }
      catch(err){
          alert("error occurred");
          console.log(err);
      }
    }

    return(
        <div>
        <div className="container" style={{marginTop:"6rem"}}>
        <div className="card text-black  mb-3" style={{border:"1px solid teal", backgroundColor:"#8a1253"}}>
        <div className="card-header">Order Summary</div>
        <div className="card-body">
        <h5 className="card-title">OrderId: {order.orderId}</h5>
        <p className="card-text">Total Cost:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                      </svg> {order.totalCost}</p>
        </div>
        </div>
        <h5> Credit Card details</h5>
        <form className='form'>
        {/* <div className="form-floating mb-3"> */}
        <label style = {{color:"black"}} for="floatingInput">Card Number</label>
         <input type="number" class="form-control" id="floatingInput" name="creditCardNumber" onChange={saveCard}  minLength={12} maxLength={12} required  />
         
         {/* </div> */}
        {/* <div className="form-floating"> */}
        <label style = {{color:"black"}} for="floatingPassword">CVV</label>
        <input type="number" class="form-control" id="floatingPassword" name="cvv" onChange={saveCard} required minLength={3} maxLength={3} placeholder="XXX"/>
    
        {/* </div> */}
        {/* <div className="form-floating"> */}
        <label style = {{color:"black"}} for="floatingPassword">Valid To</label>
        <input type="text" class="form-control" id="floatingPassword" name='validDate' onChange={saveCard} required placeholder="mm/yyyy"/>
        
        {/* </div> */}
        <div class="form-check">
        <label style = {{color:"black"}} class="form-check-label" for="flexCheckChecked">
        <a href='/tc'>I agree to  all terms and conditions</a>
        </label>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" required/>
       
       </div>
       <input  type='submit' onClick={payHandler} className='btn btn-light' style={{margin:"10px 11rem",color:"#8a1253",borderColor:"#8a1253"}}/>
       </form>
       </div>
        </div>
      )


}

export default Payment