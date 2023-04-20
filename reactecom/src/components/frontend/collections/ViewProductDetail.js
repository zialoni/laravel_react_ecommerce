import React,{useState, useEffect} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'
import {useNavigate, useParams, Link} from 'react-router-dom'
import swal from 'sweetalert';
import Spinner from '../../loader.js'
import './styleone.css'

function ViewProductDetail() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    const navigate = useNavigate();
    const productCount = product.length;
    useEffect(() => {
        const product_slug = slug;
        let isMountered = true;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                  console.log(res.data.product_data.product);
                  setProduct(res.data.product_data.product);
                  setCategory(res.data.product_data.category);
                  setLoading(false);
                }
                else if(res.data.status === 400)
                {
                    swal("Warning",res.data.message,"");
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
    }, [slug]);

    const submitAddtocard = (e, product_id) => {
        e.preventDefault();
        //console.log(product_id);
        const data = {
            product_id: product_id,
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
       var showProductList = '';
       if(productCount) {

      
       showProductList = product.map((item, idx) => {
           return (
               <div className='col-md-4 mb-3 ' key={idx}>
                   <div className='card' style={{border:'2px solid gray #002a61'}}>
                       <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                       <img src={`https://larecom.markhormedia.org/${item.image}`} className='w-100' alt={item.name}/>
                       </Link>            
                        <div className='product-name text-center'>
                            <h2>{item.name}</h2>
                        </div>
                        <div className='product-price text-center mt-0 pt-0'>
                                <h3 className='text-center'>${item.selling_price}</h3>
                        </div>
                        <div>
                        <button type="button" className='btnn w-100' onClick={(e) => submitAddtocard(e, item.id)}  > <h4>Add to Cart</h4></button>
                        </div>
                   </div>
               </div>
           )
       });
    } else {
        <div className='col-md-12'>
               <h1>No Product Available for {category.name}</h1>
        </div>  
    }
      
    }
  return (
    <div>
    <Navbar/>
     <div className='py-3'>
         <div className='container'>
             <h6>{category.name}</h6>
         </div>
     </div>
     <div className='py-3'>
         <div className='container'>
             <div className='row'>
               {showProductList}  
             </div>

         </div>

     </div>
     </div>
  )
}

export default ViewProductDetail