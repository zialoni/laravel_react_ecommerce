import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MasterLayout from '../../../layouts/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCatgory() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-category`).then(res=>{
      console.log(res.data);
      /*
      if(res.status === 200)
      {
        setCategorylist(res.data.category)
      }
      setLoading(false);*/
    });
  },[]);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete(`/api/delete-category/${id}`).then(res=>{
      if(res.data.status === 200)
      {
        swal("Success",res.data.message,"success");
        thisClicked.closest("tr").remove();
      }
      else if(res.data.status === 404)
      {
        swal("Success",res.data.message,"success");
        thisClicked.innerText = "Delete";
      }
    });

  }
  var viewcategory_HTMLTBLE = "";
  if(loading)
  {
    return <h4>Loading Category...</h4>
  }
  else
  {
    viewcategory_HTMLTBLE = categorylist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>
             <Link to={`/admin/edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
          </td>
          <td>
             <button type='button' onClick={(e) => deleteCategory(e, item.id)}  className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      )
    })
  }
  return (
    <>
    <MasterLayout/>
    <div className='row'>
        <div className="col-1">
            
        </div>
        <div className="col-11">
             <div className='container mt-5 pt-5 px-4'>
               <div class="card mt-4">
                 <div className='card-header'>
                    <h4>Category List
                      <Link to="/admin/add-category" className='btn btn-primary btn-sm float-end'>Add Category</Link>

                    </h4>
                 </div>
                 <div className='card-body'>
                   <table className='table table-bordered table-striped'>
                     <thead>
                       <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Slug</th>
                         <th>Status</th>
                         <th>Edit</th>
                         <th>Delete</th>
                       </tr>
                     </thead>
                     <tbody>
                         {viewcategory_HTMLTBLE}
                     </tbody>
                   </table>

                 </div>

               </div>

             </div>
        </div>
    </div>
    </>
  )
}

export default ViewCatgory