import React,{useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Register.css';



function Login(){

    const navigate=useNavigate();
    const [login,setLogin]=useState({
        emailId:'',
        password:''
    })
    const {emailId,password}=login
    const [response,setResponse] =useState('');
    const saveLoginDetails=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
      
        const payLoad = {
          emailId: emailId,
          password: password
        };
      
        try {
          const response = await axios.post('http://localhost:8080/pizza/app/login',payLoad, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          console.log(response.data)
          if (response.data ==='User Login success') {
            // alert("user logged in successfully");
            setResponse(response.data);
            navigate(`/userHome`)
          } else if (response.data === 'Invalid Login Credentials') {
            setResponse('Invalid Login Credentials');
            // alert("User Does Not Exist!!! Please register");
            navigate("/login");
          }
          else if (response.data === 'Admin Login Success') {
            setResponse('admin login succcess'); 
            navigate("/admin");
          }

          

          else if (response.data === 'User does not exists') {
            // setResponse('New user'); 
            alert("User Does Not Exist!!! Please register");
            // navigate("/register");
          }

        
        } catch (error) {
          setResponse('An error occurred. User not registered.');
          console.log(error);
          navigate("/register");
        }
      };
      
return(
   
     <div className='main' style = {{
      height: "auto",
      width: "100%",
      backgroundImage:
      'url("/img/pizza-background2.jpg")',
      //backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      // opacity: 0.75,
   }}>
      {/* <h1 style = {{color:"white"}}>Online Pizza Ordering Application</h1> */}
    <div className='container'>
      <header style = {{color:"white"}}>Login Form<br></br>
      <span style={{color:"red"}}>{response}</span>
      </header>
    <form onSubmit={submitHandler} className='form'>
        <label htmlFor='emailId'>Email</label>
        <input id="emailId" name='emailId' type='email' className='input-box' onChange={saveLoginDetails} required></input>

        <label htmlFor='password'>Password</label>
        <input id="password" name='password' type='password'className='input-box' onChange={saveLoginDetails} minLength={8}required></input>
  
        <input type='submit' className='button'></input>
        <br></br>
       <h6 style={{textAlign:"center",marginTop:"5px", color:"white"}}>Sign Up Now <a href='/register'> <font color="yellow">Register</font></a></h6>
    </form>
    </div>  
    </div>
    
    
)

}

export default Login