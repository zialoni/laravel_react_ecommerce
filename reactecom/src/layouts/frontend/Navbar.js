import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';
import '../../components/frontend/collections/styleone.css';

const Navbar = () => {
  const navigate = useNavigate();
    const logoutSubmit = (e) => {
      e.preventDefault();
      axios.post(`/api/logout`).then(res => {
          if(res.data.status === 200)
          {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            swal("Success",res.data.message,"success");
            navigate("/");
          }
      });
    }
   
  var AuthButtons = '';
  if(!localStorage.getItem('auth_token'))
  {
     AuthButtons = (
         <ul className='navbar-nav'>
            <li className="nav-item">
               <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="/register">Register</Link>
            </li>
         </ul>

     );
  }
  else
  {
      AuthButtons = (
        <li className="nav-item">
        <button type="button" onClick={logoutSubmit} style={{background:'transparent', fontSize:'18px', border: 'none', fontWeight: '600'}} className="nav-link btn-lg  text-white">Logout</button>
      </li>
      )
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor:'#002a61'}}>
    <div className="container">
      <Link className="navbar-brand" to="/"><text style={{color:"white",fontWeight:"700"}}>ZM</text><span style={{color:"pink",fontWeight:"700"}}>SHOP</span></Link>
      <button  className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span  className="navbar-toggler-icon btn btn-warning"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{fontWeight:'500',fontFamily:'arial'}}>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link glow"  to="/collections"><span>S</span><span>h</span><span>o</span><span>p</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          {AuthButtons}
        
        </ul>
      </div>
    </div>
  </nav>
    
  )
}

export default Navbar