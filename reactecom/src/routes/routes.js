import Dashboard from "../components/admin/Dashboard";
import Profile from '../components/admin/Profile'
import Home from "../components/frontend/Home";
import Category from "../components/admin/category/Category";
import ViewCatgory from "../components/admin/category/ViewCatgory";
import AddProduct from "../components/admin/product/AddProduct";
import ViewProduct from "../components/admin/product/ViewProduct";

const routes = [
    {path: '/admin', exact: true, name: 'Dashboard', element: Dashboard},
    {path: '/admin/add-category', exact: true, name: 'Add Category', element: Category},
    {path: '/admin/view-category', exact: true, name: 'View Category', element: ViewCatgory},
    {path: '/admin/add-product', exact: true, name: 'Add Product', element: AddProduct},
    {path: '/admin/view-product', exact: true, name: 'View Product', element: ViewProduct},
    {path: '/admin/profile', exact: true, name: 'Profile', element: Profile},
];
export default routes;