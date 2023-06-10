import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [product, setProduct] = useState('')
    const id = useParams();
    const navigate = useNavigate()
    // console.log(id);

    useEffect(() => {
        fetch(`https://assesment-server.vercel.app/product/${id?.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data)
            })
    }, [id]);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const p_name = form.p_name.value
        const c_name = form.c_name.value
        const price = form.price.value
        const status = form.status.value
        const updatePorduct = {
            name: p_name ? p_name : product?.name,
            category_name: c_name ? c_name : product?.category_name,
            status: status ? status : product?.status,
            unit_price: price ? price : product?.unit_price
        }
        console.log(updatePorduct);

        fetch(`https://assesment-server.vercel.app/product/${id?.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatePorduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    navigate('/')
                }
            })
    }

    return (
        <div className='w-4/5 mx-auto bg-slate-200'>
            <form onSubmit={(e) => handleForm(e)} className='px-24 my-10 py-14'>
                <div className='grid grid-cols-2 gap-5 '>
                    <div className='flex flex-col gap-2'>
                        <label>Product Name: </label>
                        <input type="text" name='p_name' defaultValue={product?.name} className="input input-bordered h-0 py-5 w-full " />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Category Name: </label>
                        <input type="text" name='c_name' defaultValue={product?.category_name} className="input input-bordered h-0 py-5 w-full " />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Price: </label>
                        <input type="number" name='price' defaultValue={product?.unit_price} className="input input-bordered h-0 py-5 w-full " />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Status: </label>

                        <select name='status' className="select select-bordered h-0 w-full" defaultValue={product?.status}>
                            <option>{product?.status}</option>
                            <option>Available</option>
                            <option>Discontinued</option>
                        </select>

                        {/* <input type="text" name='status' defaultValue={product?.status} className="input input-bordered h-0 py-5 w-full "  /> */}
                    </div>
                </div>

                <input type="submit" defaultValue="Submit" className='bg-[#3E803C] px-3 py-2 rounded-md text-white text-lg font-semibold flex justify-center items-center mt-10 w-full' />
            </form>
        </div>
    );
};

export default UpdateProduct;