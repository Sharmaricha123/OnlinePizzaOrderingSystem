import Home from "./Home"
import Footer from "./Footer"
function Contact(){

return(
    <div>
    <Home/>
    <div class="card" style={{margin:"10rem 30rem",width:"30rem"}}>
      <h5 class="card-header">Contact</h5>
      <div class="card-body">
        {/* <h5 class="card-title"></h5> */}
        <p class="card-text">Call us on : XX-XXXX-XXXX</p>
        <p class="card-text">Email : admin@wipro.pizza.store.com</p>

        
      </div>
    </div>
    <Footer/>
    </div>
    

)




}

export default Contact