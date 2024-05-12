

function Footer(){

return(

  <div style={{height:"3rem",backgroundColor:"teal",marginTop:"400px"}}>
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" >
    <div className="col-md-4 d-flex align-items-center"  >
      <span className="text-muted">&copy; 2023 Online PIZZA Store, Inc</span>
    </div>
    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3" ><a className="text-muted" href="#" ><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"/></svg></a></li>
      <li className="ms-3"><a className="text-muted" href="#" ><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"/></svg></a></li>
      <li className="ms-3"><a className="text-muted" href="#" ><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"/></svg></a></li>
    </ul>
  </footer>
</div>
)

}

export default Footer