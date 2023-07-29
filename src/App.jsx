import React from 'react';
import { Route,Routes } from "react-router-dom";
import "./index.css"
import Nav from "./components/Nav";
import Home from './Pages/Home'
import Add from "./Pages/Add";
import Adduser from "./Pages/Adduser";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Order from "./Pages/Order";
import Logout from "./Pages/Logout";
import Details from "./Pages/Details";
import Orders from "./Pages/Orders";
import Orderdetail from './Pages/Orderdetail';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  



  return(
    <>
   

    <Nav/>
    <Routes>
      <Route path="ShopyFi" element={<Home/>}/>
      <Route exact='true' path="/" element={<Home/>}/>
      <Route path="/Add-Product" element={<Add/>}/>
      <Route path="/Add-User" element={<Adduser/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Log-in" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/order/:productId" element={<Order />} />
      <Route path="/Log_in" element={<Logout/>}/>
      <Route path="/product/detail/:productId" element={<Details/>}/>
      <Route path="/Orders" element={<Orders/>}/>
      <Route path="/Orders/detail/:productId" element={<Orderdetail/>} />

      
      
    </Routes>
   </>
  )
}

export default App;
