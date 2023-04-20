import React, {useState} from 'react'
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';
import "../../frontend/collections/styleone.css";

function Login() {
           const navigate = useNavigate();
           const [loginInput, setLoginInput] = useState({
            email: '',
            password: '',
            error_list:[],
           })
  const handleInput = (e) => {
    e.persist();
    setLoginInput({...loginInput, [e.target.name]:e.target.value});
  }

   const loginSubmit = (e) => {
     e.preventDefault();

     const data = {
       email:loginInput.email,
       password:loginInput.password,
     }

    axios.get('/sanctum/csrf-cookie').then(response => {
     axios.post(`api/login`, data).then(res => {
       if(res.data.status === 200)
       {
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_name',res.data.username);
        swal("Success",res.data.message,"success");
        if(res.data.role === 'admin')
        {
          navigate("/admin/profile");
        }else
        {
          navigate("/");
        }
       
       }
       else if (res.data.status === 401)
       {
        swal("Warning",res.data.message,"warning");
       }
       else
       {
        setLoginInput({...loginInput, error_list: res.data.validation_errors});
       }

     });
    });

   }
  return (
    <div>
         <Navbar/>
         <div className='container py-5'>
        <div class="row justify-content-center">
          <div className='col-md-4'>
             <div className='login-form'>
             <form onSubmit={loginSubmit}>
                <div style={{backgroundColor:'#ccf4e3', padding: '4px'}}>
                    <h4 class="text-center">Please login if are you already registered with us, otherwise head to register page. </h4>
                </div>  
                <br/>               
                     <div className='form-group mb-3'>
                       <label>Email ID</label>
                      <input type="email" name="email" onChange={handleInput} value={loginInput.email} className='form-control'/>
                      <span>{loginInput.error_list.email}</span>
                     </div>
                     <div className='form-group mb-3'>
                       <label>Password</label>
                      <input type="password" name="password" onChange={handleInput} value={loginInput.password} className='form-control'/>
                      <span>{loginInput.error_list.password}</span>
                     </div>
        
                     <div className='form-group mb-3'>
                       <button type="submit" className='butn btn-block'>LOGIN</button>
                     </div>
                   </form>
             </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Login