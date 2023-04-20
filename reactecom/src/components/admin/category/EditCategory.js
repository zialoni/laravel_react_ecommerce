import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import MasterLayout from '../../../layouts/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';

function EditCategory(props) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const category_id = id;
   
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            //console.log(res.data);
          if(res.data.status === 200)
          {
              setCategory(res.data.category);
          }
          else if(res.data.status === 404)
          {
              swal("Error", res.data.message,"error");
              navigate("/admin/view-category");
          }
        });
    }, [id]);

        const handleInput = (e) => {
            e.persist();
            setCategory({...categoryInput, [e.target.name]: e.target.value});
        }
        const updateCategory = (e) => {
            e.preventDefault();
            const category_id = id;
            const data = categoryInput;
          
            axios.put(`/api/update-category/${category_id}`, data).then(res=>{
               if(res.data.status === 200)
               {
                   swal("Success",res.data.message,"success");
                   setError([]);
               }
               else if(res.data.status === 422)
               {
                   swal("All fields are mandatory","","error");
                   setError(res.data.errors);
               }
               else if(res.data.status === 404)
               {
                   swal("Error",res.data.message,"error");
                   navigate('admin/view-category')
               }
            });
        }

  return (
      <>
    <MasterLayout/>
    <div className='row'>
      <div className="col-1">

      </div>
      <div className="col-11">
    <div className='container mt-5 pt-5'>
    <h1>Edit Category
        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
    </h1>
    <form onSubmit={updateCategory} id="CATEGORY_FORM">
    <br/>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="#seo-tags" aria-selected="false">SEO Tags</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
              <div className='form-group mb-3'>
                <label>Slug</label>
                <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control'/>
                <span className='text-danger'>{error.slug}</span> 
              </div>
              <div className='form-group mb-3'>
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control'/>
                <span className='text-danger'>{error.name}</span> 
              </div>
              <div className='form-group mb-3'>
                <label>Description</label>
                <textarea  name="description" onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
              </div>
              <div className='form-group mb-3'>
                <label>Status</label>
                <input type="checkbox" onChange={handleInput} value={categoryInput.status} name="status" />
              </div>
          </div>
          <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
             <div className='form-group mb-3'>
                <label>Meta Title</label>
                <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className='form-control'/>
                <span className='text-danger'>{error.meta_title}</span>
              </div>
               <div className='form-group mb-3'>
                <label>Meta Keywords</label>
                <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className='form-control'></textarea>
              </div>
              <div className='form-group mb-3'>
                <label>Meta Description</label>
                <textarea name="meta_descrip" onChange={handleInput} value={categoryInput.meta_descrip} className='form-control'></textarea>
              </div>
          </div>
          <button type="submit" className='btn btn-primary px-4 float-end'>Update</button>
         
        </div>
        </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default EditCategory