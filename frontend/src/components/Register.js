import React,{useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Home from './Home';


function Register(){

    const navigate=useNavigate();
    const [user,setUser]=useState({
        emailId:'',
        firstName:'',
        lastName:'',
        password:'',
        phoneNo:0
    })
    const {emailId,firstName,lastName,phoneNo,password}=user
    const [response,setResponse] =useState('');
    const saveUserDetails=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
      
        const payLoad = {
          emailId: emailId,
          firstName:firstName,
         lastName:lastName,
          phoneNo: phoneNo,
          password: password
        };
      
        try {
          const response = await axios.post('http://localhost:8080/pizza/app/register', payLoad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.data ==='User registered successfully') {
            setResponse(response.data);
            navigate("/login")
          } else if (response.data === 'already') {
            setResponse('User already exists');
            navigate("/register");
          }
          else {
            setResponse('An error occurred. User not registered.');
            navigate("/register");
          }
          // console.log(response.data=='already');
        } catch (error) {
          setResponse('An error occurred. Please try again later.');
          if(error=="AxiosError: Network Error")
          navigate('/serverError');
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
  }}
    >
   
    <div className='container'>
      <header style = {{color:"white"}}>Registration Form<br></br>
      <span style={{color:"red"}}>{response}</span>
      </header>
    <form onSubmit={submitHandler} className='form'>
        <label htmlFor='emailId' >Email</label>
        <input id="emailId" name='emailId' type='email' className='input-box' pattern="[a-zA-Z0-9._+]+@(gmail|wipro)(.com)" onChange={saveUserDetails} required></input>
        <label htmlFor='firstName'>First Name</label>
        <input id="firstName" name='firstName' type='text'className='input-box' onChange={saveUserDetails} minLength={3} pattern="[a-zA-z\s]+" required></input>

        <label htmlFor='lastName'>Last name</label>
        <input id="lastName" name='lastName' type='text' className='input-box' onChange={saveUserDetails} minLength={3} pattern="[a-zA-z\s]+" required></input>


        <label htmlFor='phoneNo'>Contact number</label>
        <input id="phoneNo" name='phoneNo' type='number'  className='input-box' onChange={saveUserDetails} minLength={10} maxLength={12} required></input>

        
        <label htmlFor='password'>Password</label>
        <input id="password" name='password' type='password'className='input-box' onChange={saveUserDetails} minLength={8}required></input>
  

        <input type='submit' className='button'></input>
        <br></br>
        <h6 style={{textAlign:"center",marginTop:"5px", color:"white"}}>Already Registerd <a href='/login'style = {{color:"yellow"}}>Please Login</a></h6>
    </form>
    </div>  
    </div>
    
)

}

export default Register