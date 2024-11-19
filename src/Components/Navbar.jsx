import { NavLink, useNavigate } from "react-router-dom"
import './Home.css'


const Navbar = () => {
    const navigate=useNavigate()
  return (
      <nav className="nav-container">
          <div className="navbar d-flex ">
          <div className="nav-brand" style={{width:"20%"}}>           
                  <a href=""><i className="bi bi-backpack3-fill">URL Shortner</i></a>            
          </div>
          <div className="nav-link" style={{ width: "40%" }}>
              <ul className="d-flex " style={{marginLeft:"60px"}}>
                  <li>
                          <NavLink to={'/home/dashboard'}>HOME</NavLink>
                  </li>
                  <li>
                          <NavLink to={'/home/links'} >LINK</NavLink>
                  </li>
                  <li>
                          <NavLink to={'/home/analytics'}>ANALYTICS</NavLink>
                  </li>
              </ul>
          </div>
          <div className="nav-button d-flex justify-content-center" style={{ width: "40%",gap:"50px" }}>
                 <button className="btn btn-danger" onClick={()=>{navigate('/home/shorturl')}}>CREATE URL</button>
                  <button className="btn btn-danger" onClick={()=>{navigate('/')}}>LOGOUT</button>
                  <h3 style={{border:"1px solid red",padding:"5px"}}>User Name</h3>
          </div>
          

          </div>

      </nav>
  )
}

export default Navbar
