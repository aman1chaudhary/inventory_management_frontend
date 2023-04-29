import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <header id="head">
        <div className="banner-content">
          <h1> OFFICE INVENTORY MANAGEMENT SYSTEM</h1>
          {/* <h2>IIT Gandhinagar</h2> */}
          <Link to="/layout"><button className='home-btn'>Building Layout</button></Link>
        </div>
      </header>

        {/* <div className="about-content">
        <p>Welcome to Our Inventory Management System website! Our platform is designed to streamline and simplify inventory management for businesses of all sizes. With our user-friendly interface and powerful features, you can easily track your inventory levels, monitor stock movements, and generate real-time reports to help you make informed decisions. Our system is highly customizable, allowing you to set up alerts, notifications, and reminders to ensure that you never run out of stock or miss important deadlines. We are dedicated to providing our customers with top-notch support and ongoing training to ensure that you get the most out of our system. Thank you for considering Office Inventory Management System as your go-to inventory management solution.</p>

        </div> */}
       


    </div>

    
  )
}

export default Home