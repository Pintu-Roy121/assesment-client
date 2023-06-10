import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import LoginLayout from "../Layouts/LoginLayout/LoginLayout";
import Register from "../Pages/Register/Register";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";
import Products from "../Pages/Products/Products";
import AddPorduct from "../Pages/AddProduct/AddPorduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/update/:id',
                element: <UpdateProduct></UpdateProduct>
            },
            {
                path: '/allproduts',
                element: <Products></Products>
            },
            {
                path: '/addproduct',
                element: <AddPorduct></AddPorduct>
            },
            {
                path: '/account',
                element: <LoginLayout></LoginLayout>,
                children: [
                    {
                        path: '/account',
                        element: <Login></Login>
                    },
                    {
                        path: '/account/login',
                        element: <Login></Login>
                    },
                    {
                        path: '/account/register',
                        element: <Register></Register>
                    },
                ]
            },
        ]
    }
])