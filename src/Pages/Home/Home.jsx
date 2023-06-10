import React, { useContext, useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/UserProvider';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [allSelect, setAllSelect] = useState(false);
    const { user } = useContext(userContext);
    const [refresh, setRefresh] = useState(false)
    const [select, setSelect] = useState([])



    useEffect(() => {
        fetch('https://assesment-server.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data)
            })

    }, [refresh])

    // Get Login user.......................
    // if (id) {
    //     fetch(`https://assesment-server.vercel.app/getuser/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setUser(data)
    //         })
    // }



    // handle All Product.....................
    const handleProducts = (product) => {
        console.log(product);
    }




    // handle Product using checkbox...........................

    let singleSelect = [];

    const handleProduct = (e, id) => {
        const checked = (e.target.checked);

        if (checked) {
            singleSelect.push(id)

            setSelect([...select, id])
        }
        else if (!checked) {
            // console.log(id);
            const selectedid = select?.filter(selectedID => selectedID !== id)
            singleSelect = selectedid
            setSelect(selectedid)
        }
    }

    // Delete selected file........................
    const handleSelectedProducts = () => {
        // const data = { select }
        // console.log(data);
        fetch('https://assesment-server.vercel.app/deleteproducts', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ select })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }



    // handle all Porduct...................
    const hadleAllProduct = (e) => {
        const checked = (e.target.checked);
        if (checked) {
            setAllSelect(!allSelect)
            const Allproducts = products?.map(obj => obj.id)
            // console.log(Allproducts);
            select = Allproducts
        }
        else {
            setAllSelect(!allSelect)
            select = []
        }
        // console.log(select);
    }


    const handleDelete = (id) => {
        const confirm = window.confirm('Do you want to delete?')
        if (confirm) {

            console.log(id);
            fetch(`https://assesment-server.vercel.app/deleteproduct/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        alert('Product Deleted Successful!')
                        setRefresh(!refresh)
                    }
                })
        }

    }

    return (
        <div className='w-4/5 mx-auto py-5'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='font-bold text-lg'>
                        <tr >
                            <th>
                                <label>
                                    <input onChange={(e) => hadleAllProduct(e)} type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Product_Name</th>
                            <th>Category_ID</th>
                            <th>Category_Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i) =>
                                <tr
                                    // onClick={() => handleProducts(product)} 
                                    key={i}>
                                    <th>
                                        <label>
                                            <input onChange={(e) => handleProduct(e, product?._id)} type="checkbox" className="checkbox" />
                                        </label>
                                    </th>

                                    <td className='font-semibold text-lg'>{product?.name}</td>
                                    <td>{product?.category_id}</td>
                                    <td>{product?.category_name}</td>
                                    <td>{product?.unit_price} $</td>
                                    <td>{product?.status}</td>
                                    <td>
                                        <div className="dropdown dropdown-left">
                                            <label tabIndex={0} className='text-xl cursor-pointer'> <FaEllipsisV /></label>

                                            {
                                                user &&
                                                <div tabIndex={0} className="dropdown-content menu p-2 z-10 shadow bg-base-200 rounded-md w-32 flex flex-col gap-2">
                                                    <Link to={`/update/${product?._id}`} className='btn btn-success'>Update</Link>
                                                    <div onClick={() => handleDelete(product?._id)} className='btn btn-error'>Delete</div>
                                                </div>
                                            }
                                        </div>

                                        {/* <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className='text-xl'> <FaEllipsisV /></label>
                                            <div tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-32 flex flex-col gap-2">
                                                <Link to={`/update/${product?._id}`} className='btn btn-success'>Update</Link>
                                                <div className='btn btn-error'>Delete</div>
                                            </div>
                                        </div> */}
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;