
import React,{useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../Register.css';

function FinalPage(){

    return(
      <div className='main' style = {{
        height: "auto",
        width: "100%",
        backgroundImage:
        'url("/img/pizza-background2.jpg")',
        //backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        // opacity: 0.75,
     }}
     >
      {/* <img style={{backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200',}} src="https://cdn.pixabay.com/photo/2016/02/23/00/06/pizza-1216742_1280.png"></img> */}
        <h3 style = {{color:"white"}}><strong>Thank You For Ordering. Your Ordered is being prepared. It will be delivered shortly.</strong></h3>
      </div>
    )
  
  
  
  
  
  
  }
  export default FinalPage;