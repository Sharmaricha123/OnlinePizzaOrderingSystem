
import Register from './components/Register';
import Login from './components/Login';
import {BrowserRouter, Route, Routes,Link,useLocation} from 'react-router-dom'
import AdminHome from './components/AdminHome';
import AddStore from './components/AddStore';
import ViewStores from './components/ViewStores';
import UpdateStore from './components/UpdateStore';
import PizzaAddAndView from './components/PizzaAddAndView';
import AddPizza from './components/AddPizza';
import UpdatePizza from './components/UpdatePizza';
import HomePizza from './components/UserHome/HomePizza';


import ViewCart1 from './components/UserHome/ViewCart1';
import PlaceOrder from './components/UserHome/PlaceOrder';
import Footer from './components/Footer';
import Payment from './components/UserHome/Payment';
import Error from './components/Error';
import Logout from './components/Logout';
import ServerError from './components/ServerError';
import NotFound from './components/NF';
import Contact from './components/Contact';
import ModifyStores from './components/ModifyStores';
import DeleteStore from './components/DeleteStore';
import FinalPage from './components/UserHome/FinalPage';
{/*import ViewCart from './components/UserHome/ViewCart';*/}
{/*import PizzaManager from './components/PizzaManager';*/}

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/userHome" index element={<HomePizza/>}/>
      <Route path='/userHome/pizzas/:search'  element={<HomePizza/>}/>
        <Route path="/admin"  element={<AdminHome/>}/>
        <Route path="/addStore"  element={<AddStore/>}/>
        <Route path="/viewStores/:search"  element={<ViewStores/>}/>
        <Route path="/viewStores"  element={<ViewStores/>}/>
        <Route path="/modifyStores"  element={<ModifyStores/>}/>
        <Route path='/updateStore/:storeId'  element={<UpdateStore/>}/>
        <Route path="/deleteStores" element={<DeleteStore/>}/>
        <Route path='/managePizzas/:storeId'  element={<PizzaAddAndView/>}/>
        <Route path='/add/pizza/:storeId'  element={<AddPizza/>}/>
        <Route path='/modify/pizza/:pizzaId'  element={<UpdatePizza/>}/>
        <Route path='/finalpage' element={<FinalPage/>}/>
  {/*  <Route path='/userHome/pizzas/:search'  element={<ViewPizzas/>}/>*/}
   {/*     <Route path='/userHome/cart'  element={<ViewCart/>}/> */}
   {/*<Route path='/managePizzas/:storeId'  element={<PizzaManager/>}/>*/}


        <Route path='/userHome/cart'  element={<ViewCart1/>}/>
        <Route path='/userHome/placeOrder'  element={<PlaceOrderWrapper/>}/>
        <Route path='/userHome/payment/:orderId'  element={<Payment/>}/>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/error'  element={<Error/>}/>
        <Route path='/serverError'  element={<ServerError/>}/>
        <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter> 
      {/* <Footer/> */}
    </div>
    
  );
}

function PlaceOrderWrapper() {
  const location = useLocation();
  const cartItems = location.state.cartItems || [];

  return <PlaceOrder cartItems={cartItems} />;
}

export default App;
