import {Routes, Route } from "react-router-dom";
import Login from "./Forms/Login";
import Navbar from "./Components/Navbar";
import "./App.css";
import Register from "./Forms/Register";

import HomeFinal from "./Components/HomeFinal";
import Items from "./Components/Items";
import { AddProducts } from './Components/AddProducts'
import AboutUs from "./Components/AboutUs";
import ForgotPasword from "./Forms/Forgotpassword";
import Cart from "./Components1/Cart";
import Testimonal from "./Components/Testimonial";
import { Addtestimonial } from "./Components/Addtestimonial";



function App() {
  return (
    <Routes>

      <Route path="/" exact element={<Navbar />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/register" exact element={< Register />}/>
      <Route path="/" exact element={< Items />}/>
      <Route path='/product' exact element={< AddProducts/>}/>
       <Route path='/About' exact element={< AboutUs/>}/>
       <Route path="/forgotpassword" exact element={< ForgotPasword />}/>
       <Route path="/cart1" exact element={< Cart />}/>
       <Route path='/home' exact element={<HomeFinal/> }/>
       <Route path='/test' exact element={<Testimonal/> }/>
       <Route path='/atest' exact element={<Addtestimonial/> }/>
    </Routes>
  );
}

export default App;

