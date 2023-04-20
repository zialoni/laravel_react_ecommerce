import React,{useEffect,useState} from 'react'
import MasterLayout from '../../../layouts/admin/MasterLayout'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
     const [Categorylist, setCategorylist] = useState([]);
     const [errorlist, setError] = useState([]);
     const [loading, setLoading] = useState(true);
     const [allcheckbox, setCheckboxes] = useState(true);
     const [productInput, setProduct] = useState({
         category_id: '',
         slug: '',
         name: '',
         description: '',

         meta_title: '',
         meta_keyword: '',
         meta_descrip: '',

         selling_price: '',
         original_price: '',
         qty: '',
         brand: '',
        

     });

     const [picture, setPicture] = useState([]);

     const handleInput = (e) => {
         e.persist();
         setProduct({...productInput, [e.target.name]:e.target.value})
     }

     const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({...allcheckbox, [e.target.name]:e.target.checked});
    }



     useEffect(()=> {
        const product_id = id;
         axios.get(`/api/all-category`).then(res=>{
             //console.log(res.data);
           if(res.data.status === 200)
           {
               setCategorylist(res.data.category);
           }
         });
         axios.get(`/api/edit-product/${product_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setProduct(res.data.product);
                setCheckboxes(res.data.product);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message,"error");
                navigate("/admin/view-product");
            }
            setLoading(false);
         })
     }, [id]);

     const updateProduct = (e) => {
        const product_id = id;
         e.preventDefault();
        const formData = new FormData();
         formData.append('image', picture.image);
         formData.append('category_id', productInput.category_id);
         formData.append('slug', productInput.slug);
         formData.append('name', productInput.name);
         formData.append('description', productInput.description);
         formData.append('meta_title', productInput.meta_title);
         formData.append('meta_keyword', productInput.meta_keyword);
         formData.append('meta_descrip', productInput.meta_descrip);
         formData.append('selling_price', productInput.selling_price);
         formData.append('original_price', productInput.original_price);
         formData.append('qty', productInput.qty);
         formData.append('brand', productInput.brand);
         formData.append('featured', allcheckbox.featured ? '1':'0');
         formData.append('popular', allcheckbox.popular ? '1':'0');
         formData.append('status', allcheckbox.status ? '1':'0');

         axios.post(`/api/update-product/${product_id}`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
               // console.log(res.data.status);
                swal("All Fields are mandatory","","error");
                 setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/admin/view-product');
            }
         });
     }

     if(loading)
     {
        return <h4>Edit Product Data Loading</h4> 
     }
  return (
    <>
    <MasterLayout/>
    <div className='row'>
      <div className="col-1">

      </div>
      <div className="col-11">
       <div className='container mt-5 pt-5'>
        <div className='card'>
            <div className='card-header'>
                <h4>Edit Product
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                </h4>
            </div>
        </div>
        <div className='card-body'>
            <form onSubmit={updateProduct} encType='multipart/form-data'>       
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button className="nav-link" id="pills-seotags-tab" data-bs-toggle="pill" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
            </li>
            <li class="nav-item" role="presentation">
                <button className="nav-link" id="pills-otherdetails-tab" data-bs-toggle="pill" data-bs-target="#pills-otherdetails" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Other Details</button>
            </li>
         </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane card-body border fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                    <div className='form-group mb-3'>
                        <label>Select Category</label>
                        
                        <select name="category_id" onChange={handleInput} value={productInput.category_id} className='form-control'>
                        <option>Select Category</option>
                        {
                            Categorylist.map((item) => {
                                return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            })
                        }
                          
                        </select>
                        <small className='text-danger'>{errorlist.category_id}</small>
                    </div>
                    <div className='form-group mb-3'>
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className='form-control'/>
                        <small className='text-danger'>{errorlist.slug}</small>
                    </div>
                    <div className='form-group mb-3'>
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control'/>
                        <small className='text-danger'>{errorlist.name}</small>
                    </div>
                    <div className='form-group mb-3'>
                        <label>Description</label>
                        <textarea  name="description" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                    </div>
                </div>
                <div class="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="pills-seotags-tab" tabindex="0">
                        <div className='form-group mb-3'>
                            <label>Meta Title</label>
                            <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control'/>
                            <small className='text-danger'>{errorlist.meta_title}</small>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Meta Keyword</label>
                            <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className='form-control'></textarea>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Meta Description</label>
                            <textarea  name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className='form-control'></textarea>
                        </div>
                </div>
                <div class="tab-pane card-body border fade" id="pills-otherdetails" role="tabpanel" aria-labelledby="pills-otherdetails-tab" tabindex="0">
                    <div className="row">
                        <div className='col-md-4 form-group mb-3'>
                            <label>Selling Price</label>
                            <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className='form-control'/>
                            <small className='text-danger'>{errorlist.selling_price}</small>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Origional Price</label>
                            <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className='form-control'/>
                            <small className='text-danger'>{errorlist.original_price}</small>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Quantity</label>
                            <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className='form-control'/>
                            <small className='text-danger'>{errorlist.qty}</small>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Brand</label>
                            <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className='form-control'/>
                            <small className='text-danger'>{errorlist.brand}</small>
                        </div>
                        <div className='col-md-8 form-group mb-3'>
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleImage}  className='form-control'/>
                            <img src={`http://localhost:8000/${productInput.image}`} with="50px" height="50px"/>
                            <small className='text-danger'>{errorlist.image}</small>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Featured(checked=shown)</label>
                            <input type="checkbox" name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true:false} className='w-50 h-50'/>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Popular(checked=shown)</label>
                            <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false} className='w-50 h-50'/>
                        </div>
                        <div className='col-md-4 form-group mb-3'>
                            <label>Status(checked=Hidden)</label>
                            <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false} className='w-50 h-50'/>
                        </div>

                    </div>
                </div>
            </div>
            <button type="submit" className='btn btn-primary px-4 mt-2'>Submit</button>
            </form>
        </div>
  
      </div>
      </div>

    </div>
   
    </>
  )
}

export default EditProduct