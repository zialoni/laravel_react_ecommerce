import React, { useEffect, useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Spinner from '../../loader.js'
import './styleone.css'
function ViewCategory() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getCategory`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                   // console.log(res.data.category);
                   setCategory(res.data.category);
                   setLoading(false);
                }
            }
           
        });

        return () =>{
            isMountered = false;
        }
    });
    if(loading)
    {
        return <Spinner/>
    }
    else
    {
       var showCategoryList = '';
       showCategoryList = category.map((item, idx) => {
           return (
               <div class="col-md-6 mb-5" key={idx}>
                   <div className='card'>
                         <Link to={`/collections/${item.slug}`}>
                             <img src={`http://localhost:8000/${item.meta_keyword}`} className="h-50 w-100" alt={item.name}/>

                         </Link>
                         <div className='intro'>
                         <h1>{item.name}</h1>
                          <p>{item.description}</p>
                         </div>
    
                   </div> 

               </div>
           )
       })
    }
  return (
    <div>
    <Navbar/>
     <div className='py-3'>
         <div className='container'>
             <h6>Catgory Page</h6>
         </div>
     </div>
     <div className='py-3'>
         <div className='container'>
             <div className='row'>
               {showCategoryList}

             </div>

         </div>

     </div>
  
    
    </div>
  )
}

export default ViewCategory