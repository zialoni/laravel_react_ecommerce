import React, {useState, useEffect} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'

import {useNavigate, useParams, Link} from 'react-router-dom'
import swal from 'sweetalert';
import Spinner from '../../loader.js'
import './styleone.css'
function SingleProductDetail() {
    const {category} = useParams();
    const {slug} = useParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
   
    const navigate = useNavigate();
  
    useEffect(() => {
        const category_slug = category;
        const product_slug = slug;
        console.log(category_slug);
        console.log(product_slug);
        let isMountered = true;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res=>{
            console.log(res.data);
            
            if(isMountered)
            {
                if(res.data.status === 200)
               
                {
                  setProducts(res.data.product);
                  console.log(res.data);
                  setLoading(false);
                }
                else if (res.data.status === 404)
                {
                   navigate('/collections'); 
                   swal("Warning",res.data.message,"error");
                }
            }
           
        });

        return () =>{
            isMountered = false;
        }
    }, [category, slug]);

    const handleDecrement = () =>{
        if(quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
     
    }

    const handleIncrement = () =>{
        if(quantity < 10) {
            setQuantity(prevCount => prevCount + 1);
        }
        
    }

   const submitAddtocard = (e) => {
       e.preventDefault();
       const data = {
           product_id: products.id,
           product_qty: quantity
       }

       axios.post(`/api/add-to-cart`, data).then(res=>{
           if(res.data.status === 201){
                swal("Success",res.data.message,"success");
           }else if(res.data.status === 409){
                swal("Warning",res.data.message,"warning");
           }else if(res.data.status === 401){
               swal("Error",res.data.message,"error");
           }else if(res.data.status === 404){
            swal("Warning",res.data.message,"warning");
        }

       })
   } 

    if(loading)
    {
        return <Spinner/>
    }
    else
    {
       var avail_stock = '';
       if(products.qty > 0) 
       {
           avail_stock =  <div>
          
                <div className='row'>
                    <div className="col-md-2 mt-3">
                      <label className='btn-sm btn-success pt-2 px-4'><h5>In stock</h5></label>
                    </div>
                    <div className="col-md-2 mt-3">
                        <div className='input-group mt-1'>
                            <button type="button" onClick={handleDecrement} className='input-group-text'>-</button>
                            <div  className='form-control text-center'>{quantity}</div>
                            <button type="button" onClick={handleIncrement} className='input-group-text'>+</button>
                        </div>

                    </div>
                </div>
                <div>
                    <br/>
                    <br/>
                    <div className='col-md-12 mt-3'>
                        <button type="button" className='butn btn-block w-100 pt-2 pb-2' onClick={submitAddtocard}> <h3>Add to Cart</h3></button>

                    </div>
                </div>
       </div>

       }else{
        avail_stock =  <div>
        <label className='btn-sm btn-danger px-4 mt-2'>Out of stock</label>
        </div>
       }
      
    }
  return (
    <div>
     <Navbar/>
     <div className='py-3'>
         <div className='container'>
             <h6>{products.category.name} / {products.name}</h6>
         </div>
     </div>
     <div className='py-3'>
         <div className='container'>
             <div className='row'>
                 <div className="col-md-4 border-end">
                     <img src={`https://larecom.markhormedia.org/${products.image}`} alt={products.name} className='w-100'/>
                 </div>
                 <div className='col-md-8' style={{ }}>
                     <h2>
                         {products.name}
                         <span className='float-end badge btn-sm btn-danger badge-pil'>{products.brand}</span>
                     </h2>
                     <br/>
                       <div>
                       <span class="fa fa-star checked fa-2x"></span>
                        <span class="fa fa-star checked fa-2x"></span>
                        <span class="fa fa-star checked fa-2x"></span>
                        <span class="fa fa-star checked fa-2x"></span>
                        <span class="fa fa-star fa-2x"></span>
                       </div>
                      
                     <br/>
                     <text class="desc_text">{products.description}</text>
                     <br/><br/>
                     <h4 className='mb-1'>
                         ${products.selling_price}
                          <s className='ms-2 text-danger'> ${products.original_price}</s>
                     </h4>
                     <br/>
                     <div>
                         {avail_stock}
                     </div>
                
                 </div>
             </div>
         </div>
     </div>
    </div>
  )
}

export default SingleProductDetail