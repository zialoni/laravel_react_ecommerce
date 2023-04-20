import React,{useEffect, useState} from 'react'
import MasterLayout from '../../../layouts/admin/MasterLayout'
import {Link} from 'react-router-dom'
import axios from 'axios'

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [vProduct, setProduct] = useState([]);
    useEffect(() => {
        document.title = "View Product";
        
        axios.get("/api/view-product").then(res=>{
          if(res.data.status === 200)
          {
              console.log(res.data.products);
              setProduct(res.data.products);
              setLoading(false);
          }
        })
    }, [])

    var display_Productdata = "";
    if(loading)
    {
        return <h4>View Products Loading...</h4>
    }
    else
    {
        var ProdStatus = '';
        display_Productdata = vProduct.map((item) => {
            
            if(item.status == '0')
            {
               ProdStatus = 'shown';
            }else if(item.status == '1'){
                ProdStatus = 'Hidden';
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category_name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td><Link to={`/admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
                    <td>{ProdStatus}</td>
                </tr>
            )

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
       <div className='card px-4 mt-3'>   
        <div className='card-header'>
            <h4>View Product
                <Link to="/admin/add-product" className="btn btn-success btn-sm float-end mt-2">Add Product</Link>
            </h4>   
        </div> 
        <div className='card-body'>
            <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Category Name</th>
                             <th>Product Name</th>
                             <th>Selling Price</th>
                             <th>Image</th>
                             <th>Edit</th>
                             <th>Status</th>
                         </tr>
                     </thead>
                     <tbody>
                         {display_Productdata}
                     </tbody>
                </table>

            </div>
        </div>                
      </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default ViewProduct