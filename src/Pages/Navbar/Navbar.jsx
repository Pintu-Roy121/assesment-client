import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserProvider';
import { FaUserAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate()
    const { refresh, setRefresh, user } = useContext(userContext);

    // console.log(user);
    // Get Login user.......................
    // if (id) {
    //     fetch(`https://assesment-server.vercel.app/getuser/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setUser(data)
    //         })
    // }
    // console.log(refresh);
    const handleLogout = () => {
        setRefresh(!refresh)
        navigate('/account')
        localStorage.removeItem('User');
        window.location.reload();
    }

    return (
        <div className='bg-gray-200 flex justify-between items-center'>
            <div className='w-4/5 mx-auto flex justify-between gap-5 text-lg font-semibold py-3'>
                <div className='flex gap-5'>
                    <Link to='/'>Home</Link>

                    {
                        user ?
                            <>
                                <Link to='/allproduts'>Products</Link>
                                <div onClick={handleLogout} className='hover:text-error duration-500 cursor-pointer'>Logout</div>
                            </>
                            :
                            <Link to='/account' className='cursor-pointer'>Login</Link>
                    }
                </div>
                {/* <div onClick={handleLogout} className='hover:text-error duration-500 cursor-pointer'>Logout</div>

                <Link to='/account' className='cursor-pointer'>Login</Link> */}
                <div className='flex gap-2 items-center'>
                    <FaUserAlt />
                    {user?.Name}
                </div>
            </div>
        </div>
    );
};

export default Navbar;