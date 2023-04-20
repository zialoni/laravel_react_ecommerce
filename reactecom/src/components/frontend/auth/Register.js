import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

const Register = () => {
          const navigate = useNavigate();
          const [registerInput, setregisterInput] = useState({
              name: '',
              email: '',
              password: '',
              error_list:[],
          });
         const handleInput = (e) => {
           e.persist();
           setregisterInput({...registerInput, [e.target.name]:e.target.value});
         }
         const registerSubmit = (e) => {
           e.preventDefault();
           const data = {
             name:registerInput.name,
             email:registerInput.email,
             password:registerInput.password
           }
          axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res =>{
              if(res.data.status === 200)
              {
                 localStorage.setItem('auth_token',res.data.token);
                 localStorage.setItem('auth_name',res.data.username);
                 swal("Success",res.data.message,"success");
                 navigate("/");
              }
              else
              {
                setregisterInput({...registerInput, error_list:res.data.validation_errors})
              }
            });
          });
         }
      
  return (
    <div>
      <Navbar/>
      <div className='container py-5'>
        <div className="row justify-content-center">
          <div className='col-md-4'>
               <div className='login-form'>                  
                   <form onSubmit={registerSubmit}>
                      <div style={{backgroundColor:'#ccf4e3', padding: '4px'}}>
                            <h4 class="text-center">Please fill in details to register for ZMSHOP</h4>
                        </div>
                        <br/>
                     <div className='form-group mb-3'>
                       <label>Full Name</label>
                      <input type="text" name="name" onChange={handleInput} value={registerInput.name} className='form-control' />
                      <span className="text-danger">{registerInput.error_list.name}</span>
                     </div>
                     <div className='form-group mb-3'>
                       <label>Email ID</label>
                      <input type="email" name="email" onChange={handleInput} value={registerInput.email} className='form-control' />
                      <span className="text-danger">{registerInput.error_list.email}</span>
                     </div>
                     <div className='form-group mb-3'>
                       <label>Password</label>
                      <input type="password" name="password" onChange={handleInput} value={registerInput.password} className='form-control' />
                      <span className="text-danger">{registerInput.error_list.password}</span>
                     </div>
                     <div className='form-group mb-3'>
                       <button type="submit" className='butn btn-block'>Register</button>
                     </div>
                   </form>
               </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Register