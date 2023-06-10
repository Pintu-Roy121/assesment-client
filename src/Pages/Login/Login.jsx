import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserProvider';

const Login = () => {
    const navigate = useNavigate();
    const { setUserId } = useContext(userContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password }


        fetch('https://assesment-server.vercel.app/getuser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                if (data?.login) {
                    localStorage.setItem('User', data?._id)
                    setUserId(data?._id)
                    navigate('/')
                }
                else (
                    alert(data?.message)
                )
            })
    }


    return (
        <div className='p-5'>
            <h1 className='text-xl font-semibold'>Log In</h1>
            <hr className='my-5 border-b-2' />
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-5 px-24 my-10'>
                <div className='flex gap-4 items-center'>
                    <span>Username: </span>
                    <input type="email" name='email' placeholder="Enter your email" className="input input-bordered h-0 py-5 w-full max-w-xs" />
                </div>
                <div className='flex gap-4 items-center'>
                    <span>Password : </span>

                    <input type="password" name='password' placeholder="Enter your password" className="input input-bordered h-0 py-5 w-full max-w-xs" />
                </div>

                <input type="submit" value="Login" className='bg-[#3E803C] px-3 py-2 rounded-md text-white text-lg font-semibold w-24 ml-24' />
            </form>
        </div>
    );
};

export default Login;