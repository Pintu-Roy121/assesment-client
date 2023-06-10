import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const LoginLayout = () => {

    const currentRoute = useLocation();

    return (
        <div className='w-4/5 mx-auto'>
            <div>
                <h1 className='text-3xl font-bold'>Have an Account?</h1>
                <hr className='my-3' />
                <div className='bg-gray-100 p-2 border-2 mb-10 rounded-md'>
                    <div className='flex gap-5'>
                        <Link to='/account/login' className={currentRoute?.pathname === '/account/login' ? 'bg-white rounded-md px-3 py-2 text-xl font-semibold' : ' rounded-md px-3 py-2 text-xl font-semibold'}>Login</Link>
                        <Link to='/account/register' className={currentRoute?.pathname === '/account/register' ? 'bg-white rounded-md px-3 py-2 text-xl font-semibold' : 'rounded-md px-3 py-2 text-xl font-semibold'}>Create Accout</Link>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default LoginLayout;