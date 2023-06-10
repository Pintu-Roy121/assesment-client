import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddPorduct = () => {
    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const p_name = form.p_name.value
        const c_name = form.c_name.value
        const c_id = form.c_id.value
        const price = form.price.value
        const status = form.status.value
        const product = {
            name: p_name,
            category_name: c_name,
            category_id: c_id,
            status: status,
            unit_price: price,
        }
        // console.log(product);
        fetch('https://assesment-server.vercel.app/createproduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.acknowledged) {
                    alert('Product add Successful')
                    navigate('/')
                }
            })
    }
    return (
        <div className='w-4/5 mx-auto py-5'>
            <div className='bg-gray-100 rounded-md p-8'>

                <form onSubmit={(e) => handleForm(e)} className='px-24 my-10 py-14'>
                    <div className='grid grid-cols-2 gap-5 '>
                        <div className='flex flex-col gap-2'>
                            <label>Product Name: </label>
                            <input type="text" name='p_name' className="input input-bordered h-0 py-5 w-full " required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Category Name: </label>
                            <input type="text" name='c_name' className="input input-bordered h-0 py-5 w-full " required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Price: </label>
                            <input type="text" name='price' className="input input-bordered h-0 py-5 w-full " required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Category_Id: </label>
                            <input type="number" name='c_id' className="input input-bordered h-0 py-5 w-full " required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Status: </label>

                            <select name='status' className="select select-bordered h-0 w-full" defaultValue='Available' required>
                                <option>Available</option>
                                <option>Discontinued</option>
                            </select>

                            {/* <input type="text" name='status' defaultValue={product?.status} className="input input-bordered h-0 py-5 w-full "  /> */}
                        </div>
                    </div>

                    <input type="submit" defaultValue="Submit" className='bg-[#3E803C] px-3 py-2 rounded-md text-white text-lg font-semibold flex justify-center items-center mt-10 w-full' />
                </form>
            </div>
        </div>
    );
};

export default AddPorduct;