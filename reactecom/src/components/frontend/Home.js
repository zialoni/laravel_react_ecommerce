import React from 'react'
import Navbar from '../../layouts/frontend/Navbar';
import "../frontend/collections/styleone.css";
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
    <Navbar/>
      <div class="homepage ">
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/collections" ><h1 className='text-center'>Go Shopping<span><i class='fa fa-cart-arrow-down fa-lg'></i></span></h1></Link> 
      </div>
    </div>
  )
}

export default Home

