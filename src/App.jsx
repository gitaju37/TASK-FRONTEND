import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgetPassword from "./Components/ForgetPassword";
import Home from "./Components/Home";
import ChangePassword from "./Components/ChangePassword";
import Activation from "./Components/Activation";
import Dashboard from "./Components/Dashboard";
import Links from "./Components/Links";
import Analytics from "./Components/Analytics";
import ShortUrl from "./Components/ShortUrl";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pwreset" element={<ForgetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/activation/:token" element={<Activation />} />

        
          <Route path="/home" element={<Home />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="links" element={<Links />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="shorturl" element={<ShortUrl/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
