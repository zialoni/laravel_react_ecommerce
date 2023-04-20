import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import Publicroutelist from '../../routes/Publicroutelist';

function FrontendLayout() {
  return (
    <div>
        <Navbar/>
        <div>
            <Routes>
                {
                    Publicroutelist.map((routedata, idx) => {
                        console.log(routedata);
                        return (
                            routedata.component && (
                                <Route
                                 key={idx}
                                 path={routedata.path}
                                 exact={routedata.exact}
                                 name={routedata.name}
                                 render={(props) => (
                                     <routedata.element {...props}/>
                                 )}
                                />
                                
                            )
                        )
                    })
                }
            </Routes>
        </div>
    </div>
  )
}

export default FrontendLayout