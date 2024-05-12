import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Login from './Login';

function Logout(){

    useEffect(()=>{
        axios.get(`http://localhost:8080/pizza/app/logout`)
                        .catch(err=>console.log(err));
    });
    return(
        <div>
        <Login/>
        </div>

    )
}

export default Logout;