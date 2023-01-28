import React, { useEffect } from 'react'
import "./HomeFinal.css";
import Items from './Items';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import Testimonal from "./Testimonial";

const HomeFinal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('isUserLoggedin') !== 'yes'){
      navigate('/login')
    }
  }, [])
  
  return (
    <div>
      <Navbar/>
    <div className="first-container">
		<img src="images/home.jpg"/>
		<div className="mobile-image">
			<img src="images/Final-Website-Image.png"/>
		</div>
		<div className="content">
			<h1>Lorem Ipsum Dolor</h1>
			<p>Lorem ipsum dolor sit amet consectetur</p>
			<a href="#">Get Started</a>
		</div>
    </div>
    <div className="second-container">
      <div className="h2">
        {<Testimonal/> }
      </div>
    </div>
    <div className="third">  <Items/></div>
    </div>
  )
}

export default HomeFinal
