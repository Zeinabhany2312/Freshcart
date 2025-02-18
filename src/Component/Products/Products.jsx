import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
    let { addCart, setItemNum } = useContext(CartContext)
    let [page, setPage] = useState(1)

    function getProducts(queryData) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)
    }
    let { isLoading, isError, isFetching, data } = useQuery(['productsApi', page], getProducts, {}
    )

    async function AddToCart(id) {
        let req = await addCart(id).catch((err) => {
            toast.error('This is an error!');

        })
        if (req.data.status == 'success') {
            setItemNum(req.data.numOfCartItems)
            toast.success('Successfully added!');
        }

        console.log(req);
    }

    function getPageNum(event) {
        let page = event.target.getAttribute('pagenum')
        setPage(page)
    }

    function addToWishList(e, id) {

        e.target.classList.replace('fa-regular', 'fa-solid')
    }
    return (<>

        <Toaster />
        {isLoading ? <div className='loading position-fixed d-flex justify-content-center align-items-center top-0 end-0 bottom-0 start-0 '>
            <span className="loader"></span>
        </div>
            : <div className='container py-5 '>
                <div className='row g-3'>
                    {data?.data.data.map((item) => {
                        return <div key={item.id} className='col-md-2 position-relative'>
                            <div className='product cursor-pointer p-1 '>
                                <Link to={`/ProductDetails/` + item.title + `/` + item.id}>
                                    <img src={item.imageCover} className='w-100' alt='' />
                                    <h6 className='text-main'>{item.category.name}</h6>
                                    <h5>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
                                    <div className='d-flex justify-content-between'>
                                        <span>{item.price}EGP</span>
                                        <span><i className='fa-solid fa-star rating-color'></i>{item.ratingsAverage}</span>
                                    </div>
                                </Link>
                                <i onClick={(e) => addToWishList(e, item.id)} className='fa-regular fa-heart fs-4 position-absolute top-0 end-0 my-2 mx-3 text-danger'></i>

                                <button onClick={() => { AddToCart(item.id) }} className='btn bg-main text-white d-block w-100'>Add to cart</button>

                            </div>
                        </div>
                    })}

                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center my-2">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" pagenum='1' onClick={getPageNum}>1</a></li>
                        <li className="page-item"><a className="page-link" pagenum='2' onClick={getPageNum}>2</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        }
    </>
    )
}
