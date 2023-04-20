import React,{useState, useEffect} from 'react'
import ReactDOM  from 'react-dom';
import Navbar from '../../layouts/frontend/Navbar'
import axios from 'axios'
import {useNavigate, useParams, Link} from 'react-router-dom'
import swal from 'sweetalert';

function Checkout() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    var totalCartPrice = 0;
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''

    });

    const [error, setError] = useState([]);

    if(!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning","Login to goto Cart Page" ,"error");
        
    }
    useEffect(() => {
      
        let isMountered = true;
        axios.get(`/api/cart`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                  setCart(res.data.cart);
                  setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    navigate('/collections'); 
                    swal("Warning",res.data.message,"");
                }
               
            }
           
        });

        return () =>{
            isMountered = false;
        }
    }, []);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value});
    }

    const orderinfo_data = {
        firstname:checkoutInput.firstname,
        lastname:checkoutInput.lastname,
        phone:checkoutInput.phone,
        email:checkoutInput.email,
        address:checkoutInput.address,
        city:checkoutInput.city,
        state:checkoutInput.state,
        zipcode:checkoutInput.zipcode,
        payment_mode: 'Paid by PayPal',
        payment_id: ''
    }
   // paypal code
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                //value: totalCartPrice,
                value: "0.1",
              },
            },
          ],
        });
      };
      const onApprove = (data, actions) => {
        //return actions.order.capture();
        return actions.order.capture().then(function(details){
            console.log(details);
            orderinfo_data.payment_id = details.id;
            axios.post(`/api/place-order`, orderinfo_data).then(res=>{
                if(res.data.status === 200)
                {
                    swal("Order placed Successfully",res.data.message,"success");
                    setError([]);
                    navigate('/thank-you');
                } 
                else if(res.data.status === 422)
                {
                    swal("All fields are mandatory","","error");
                    setError(res.data.errors);
                }
    
            });

        });
      };

      //paypal code



    const submitOrder = (e, payment_mode) => {
        e.preventDefault();
        const data = {
            firstname:checkoutInput.firstname,
            lastname:checkoutInput.lastname,
            phone:checkoutInput.phone,
            email:checkoutInput.email,
            address:checkoutInput.address,
            city:checkoutInput.city,
            state:checkoutInput.state,
            zipcode:checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: ''
        }
       

        switch (payment_mode){
            case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        swal("Order placed Successfully",res.data.message,"success");
                        setError([]);
                        navigate('/thank-you');
                    } 
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandatory","","error");
                        setError(res.data.errors);
                    }
        
                });

                break;

            case 'razorpay':
                axios.post(`/api/validate-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        setError([]);
                    } 
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandatory","","error");
                        setError(res.data.errors);
                    }
                });
                break;

                case 'payonline':
                    axios.post(`/api/validate-order`, data).then(res=>{
                        if(res.data.status === 200)
                        {
                            setError([]);
                             const myModal = new window.bootstrap.Modal('#payOnlineModal');
                             myModal.show();
                            //payOnlineModal
                        } 
                        else if(res.data.status === 422)
                        {
                            swal("All fields are mandatory","","error");
                            setError(res.data.errors);
                        }
                    });
                    break;
        default:
            break;
        }
    }

    if(loading)
    {
        return <h4>Loading Checkout...</h4>
    }

    var checkout_HTML = '';
    if(cart.length > 0) {
        checkout_HTML =   <div>
                  <div className='row'>
                <div className='col-md-7'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Basic Information</h4>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className='form-group mb-3'>
                                        <label>First Name</label>
                                        <input typr="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className='form-control'/>
                                        <small className='text-danger'>{error.firstname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='form-group mb-3'>
                                        <label>Last Name</label>
                                        <input typr="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className='form-control'/>
                                        <small className='text-danger'>{error.lastname}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='form-group mb-3'>
                                        <label>Phone Number</label>
                                        <input typr="text" name="phone" onChange={handleInput} value={checkoutInput.phone}  className='form-control'/>
                                        <small className='text-danger'>{error.phone}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='form-group mb-3'>
                                        <label>Email Address</label>
                                        <input typr="text" name="email" onChange={handleInput} value={checkoutInput.email} className='form-control'/>
                                        <small className='text-danger'>{error.email}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className='form-group mb-3'>
                                        <label>Full Address</label>
                                        <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                        <small className='text-danger'>{error.address}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='form-group mb-3'>
                                        <label>City</label>
                                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className='form-control'/>
                                        <small className='text-danger'>{error.city}</small>
                                        
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='form-group mb-3'>
                                        <label>State</label>
                                        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className='form-control'/>
                                        <small className='text-danger'>{error.state}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='form-group mb-3'>
                                        <label>Zip Code</label>
                                        <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode}  className='form-control'/>
                                        <small className='text-danger'>{error.zipcode}</small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className='form-group text-end'>
                                 
                                        <button type="button" className='btnn  mx-1' onClick={(e) => submitOrder(e, 'cod')}>Place Order</button>
                                        <button type="button" className='btnn  mx-1' onClick={(e) => submitOrder(e, 'razorpay')}>Place Online</button>
                                        <button type="button" className='btnn  mx-1' onClick={(e) => submitOrder(e, 'payonline')}>PayPal</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                         
                    </div>
                </div>
                <div className='col-md-5'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th width="50%">Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.map((item, idx) => {
                    totalCartPrice += item.product.selling_price * item.product_qty;
                    return ( 
                           <tr key={idx}>
                                <td>{item.product.name}</td>
                                <td>{item.product.selling_price}</td>
                                <td>{item.product_qty}</td>
                                <td>{item.product.selling_price*item.product_qty}</td>
                            </tr>
                     )
                    })}
                    <tr>
                        <td colSpan="2" className='text-end fw-bold'>Grand Total</td>
                        <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                    </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    }
     else
    {
        checkout_HTML = <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Your Cart is Empty</h4>

            </div>
        </div>
    }
  return (
    <div>
    <Navbar/>      

    <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <hr/>
                <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        />
            </div>
            </div>
        </div>
       </div>
            <div className='py-3'>
                <div className='container'>
                    <h6>Home/Checkout</h6>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                {checkout_HTML}
                </div>
            </div>
    </div>
  )
}

export default Checkout