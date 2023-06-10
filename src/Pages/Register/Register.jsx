import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handleShow = () => {
        setShow(!show)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const First_Name = form.F_name.value;
        const Last_Name = form.L_name.value;
        const Email = form.email.value.toLowerCase();
        const Pass = form.password.value;
        const Address = form.address.value;
        const user = {
            Name: First_Name + ' ' + Last_Name,
            Email,
            Pass,
            Address
        }
        console.log(user);

        fetch('https://assesment-server.vercel.app/create/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.acknowledged || data?.message === 'User already saved') {
                    navigate('/');
                    localStorage.setItem('User',)
                }
            })
    }

    return (
        <div className='p-5'>
            <h1 className='text-xl font-semibold'>Create Account</h1>
            <hr className='my-5 border-b-2' />
            <form onSubmit={(e) => handleRegister(e)} className='flex flex-col px-24 gap-5'>
                <div className='flex flex-col gap-2'>
                    <label>First Name: </label>
                    <input type="text" name='F_name' placeholder="Enter your First Name" className="input input-bordered h-0 py-5 w-full max-w-xs" required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Last Name: </label>
                    <input type="text" name='L_name' placeholder="Enter your last Name" className="input input-bordered h-0 py-5 w-full max-w-xs" required />

                </div>
                <div className='flex flex-col gap-2'>
                    <label> Email:</label>
                    <input type="email" name='email' placeholder="Enter your email" className="input input-bordered h-0 py-5 w-full max-w-xs" required />
                </div>
                <div className='flex flex-col gap-2 relative'>
                    <label> Password:</label>
                    <div onClick={handleShow} className='absolute top-11 left-72'>
                        {
                            show ? <FaEyeSlash /> : <FaEye />
                        }
                    </div>
                    <input type={show ? "password" : "text"} name='password' placeholder="Enter your password" className="input input-bordered h-0 py-5 w-full max-w-xs" required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Address:</label>
                    <textarea name='address' className="textarea textarea-bordered max-w-xs" placeholder="Address" required />
                </div>
                <input type="submit" value="Create Account" className='bg-[#3d11b4] px-3 py-2 rounded-md text-white text-lg font-semibold w-40' />
            </form>

        </div >
    );
};

export default Register;