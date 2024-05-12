import { useState, useEffect } from 'react';
import '../index.css'
import './Register.css'
import Footer from './Footer'
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
function AdminHome() {

        const [search, setSearch] = useState();
        const navigate = useNavigate();
        const findStore = () => {
                navigate(`/viewStores/${search}`);
        }

        return (

                <div>
                        {/* <nav className="navbar " style={{backgroundColor: "#f70776"}}>
    <a href="/admin" className="nav-link">Admin Home</a>
    <a href="/login">Admin Login</a>
    <a href="/viewStores">View Stores</a>
    <a href="/addStore">Add Store</a>
    <a href="/viewStores">Update Store</a>
    <a href="/viewStores">Delete Store</a>
    </nav> teal*/}
                        <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#8a1253" }}>
                                <div className="container-fluid">
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon" ></span>
                                        </button>
                                        <Link className="navbar-brand" to="/" style={{ color: "white" }}>Pizza Store</Link>
                                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                        {/*<li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/admin" style={{ color:"white"}} >Admin Home</Link>
  </li>*/}



                                                        <li className="nav-item">
                                                                <Link className="nav-link active" aria-current="page" to="/viewStores" style={{ color: "white" }} >View Stores</Link>
                                                        </li>


                                                        <li className="nav-item">
                                                                <Link className="nav-link active" aria-current="page" to="/addStore" style={{ color: "white" }} >Add Store</Link>
                                                        </li>


                                                        <li className="nav-item">
                                                                <Link className="nav-link active" aria-current="page" to="/modifyStores" style={{ color: "white" }} >Modify Store</Link>
                                                        </li>

                                                        <li className="nav-item">
                                                                <Link className="nav-link active" aria-current="page" to="/deleteStores" style={{ color: "white" }} >Delete Store</Link>
                                                        </li>





                                                        {/*

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Manage Stores
          </Link>
          <ul className="dropdown-menu">
                <li className="nav-item">
                    <Link className="nav-link" to="/viewStores">View Stores</Link>
                </li>
                 <li className="nav-item">
                     <Link className="nav-link" to="/addStore">Add Store</Link>
                 </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/viewStores">Modify Store</Link>
                </li>
                <li className="nav-item">
                     <Link className="nav-link" to="/viewStores">Delete Store</Link>
                </li>
            </ul>
        </li>



*/}
                                                </ul>
                                                {/* <form className="d-flex" role="search" onSubmit={findStore}>
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

export default AdminHome