import { useState } from "react";
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useNavigate,useParams } from "react-router-dom";
function Home(){

  const [search,setSearch]=useState();
  const navigate=useNavigate();
  const findPizza=()=>{
    navigate(`/userHome/pizzas/${search}`);
  }

    return(
        // <header>
        // <ul>
        // <li><a href="/admin">Admin</a></li>
        // a<li><a href="/register">Register</a></li>
        // <li><a href="/login">Login</a></li>
        // <li><a href="/logout">Logout</a></li> 
        // <li><a href="/userHome">User Home</a></li> 
        // <li><a href="/userHome/cart">cart</a></li>
        // </ul>
        // </header>
<div>
<nav className="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#8a1253"}}>
   <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" ></span>
    </button>
    <a className="navbar-brand" href="/" style={{ color:"white"}}>PIZZA Store</a>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        {/* <Link to="/login" ></Link> */}
       <Link to="/userHome" className="nav-link" >Home</Link>
        {/* <a className="nav-link" aria-current="page" href="/userHome"  >Home</a> */}
        </li>


        {/* <li className="nav-item">
                     <Link className="nav-link" to="/logout">Logout</Link>
                 </li> */}
                <li className="nav-item">
                     <Link className="nav-link " to="/userHome/cart">Cart</Link>
                </li>





        {/* <li className="nav-item">
          <a className="nav-link" href="/register">Sign Up</a>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/logout">Logout</a>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link" href="/userHome/vcds">Home</a>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link" href="/userHome/cart">cart</a>
        </li> */}



        
        <li className="nav-item dropdown">
          {/* <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-circle"  ></i> Profile
          </Link> */}
          <ul className="dropdown-menu">
                {/* <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li> */}
                 <li className="nav-item">
                     <Link className="nav-link" to="/logout">Logout</Link>
                 </li>
                <li className="nav-item">
                     <Link className="nav-link " to="/userHome/cart">Cart</Link>
                </li>
            </ul>
            
        </li>
        {/* <li className="nav-item">
                     <Link className="nav-link " to="/contact">Contact</Link>
         </li> */}
      </ul>
       {/* <form className="d-flex" role="search" onSubmit={findPizza}>
       <input className="form-control me-2" name="search" type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search" aria-label="Search"/>
       <button className="btn" style={{ color:"white"}} type="submit">
       <i class="bi bi-search"></i></button>
      </form> */}

<ul className="navbar-nav mb-2 mb-lg-0" style={{ float: "right" }}>
        <li className="nav-item">
                <Link className="nav-link" to="/logout"  >Log out</Link>
        </li>
</ul>
    </div>
  </div>
</nav>

</div>
 )

}

export default Home