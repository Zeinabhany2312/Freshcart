import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Categories() {
    let { isLoading, isError, data, error, refetch } = useQuery('productsApi', fetchData);
    let [categories, setCategories] = useState([]);

    async function fetchData() {

        let response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories').catch((err) => {
            console.log(err);
        })
        setCategories(response.data.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ?
                <div className='loading position-fixed d-flex justify-content-center align-items-center top-0 end-0 bottom-0 start-0'>
                    <span className="loader"></span>
                </div>
                :
                <div>
                    <h2 className='text-center mb-4 mt-3'>Categories</h2>

                    <div className="container">
                        <div className='row'>
                            {categories.map((category) => (
                                <div className='col-md-3' key={category._id}>
                                    <div className=" text-center  " >
                                        <img src={category.image} alt="" className='w-100' height={300} />
                                        <ul className='p-0'>
                                            <li className='my-2 nav-link ' key={category._id}>{category.name}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div></div>

                </div>
            }
        </div>
    );
}
