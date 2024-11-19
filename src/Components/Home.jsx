
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"



const Home = () => {
  return (
    <div className="home-container">
      <Navbar /> 
      <Outlet  />
    </div>
  )
}

export default Home
