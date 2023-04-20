
import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact'



const Publicroutelist = [
    {path: '/', exact: true, name: 'Home', element: Home},
    {path: '/about', exact: true, name: 'About', element: About},
    {path: '/contact', exact: true, name: 'Contact', element: Contact},
   
];
export default Publicroutelist;