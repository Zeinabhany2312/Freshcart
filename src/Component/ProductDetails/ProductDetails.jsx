import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    let { addCart, setItemNum } = useContext(CartContext)
    let param = useParams()
    let [productId, setProductId] = useState()

    useEffect(() => {
        setProductId(param.id)
    }, [])

    let { data, isLoading, isError } = useQuery(["productdetails", productId], getDetails);
    let product = data?.data.data;

    function getDetails(query) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`);
    }
    function getSrc(e) {
        let imgPath = e.target.getAttribute('src');
        document.querySelector('#myImg').setAttribute('src', imgPath)
    }
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

    if (isLoading) {
        return (
            <div className='loading position-fixed d-flex justify-content-center align-items-center top-0 end-0 bottom-0 start-0 '>
                <span className="loader"></span>
            </div>
        );
    }
    // if (isError) return <div>Error fetching data</div>;
    // if (!product) return <div>No product found</div>;

    return (<>
     <Toaster/>
        <div className='container py-5'>
            <div className='row align-items-center'>

                <div className='col-md-4'>
                    <div className='row align-items-center'>

                        <div className='col-md-2' >
                            {product.images.map((el, id) => {
                                return <img key={id} onClick={getSrc} src={el} className='w-100 border mb-2 cursor-pointer' alt="" />
                            })}
                        </div>

                        <div className='col-md-10'>
                            <img id='myImg' src={product?.imageCover} className='w-100' alt="" />
                        </div>
                    </div>
                </div>

                <div className='col-md-8'>
                    <h2>{product.title}</h2>
                    <p className='text-muted my-3'>{product.description}</p>
                    <h6>{product.category.name}</h6>

                    <div className='d-flex justify-content-between'>
                        <span>{product.price}EGP</span>
                        <span><i className='fa-regular fa-star rating-color'></i>{product.ratingsAverage}</span>
                    </div>

                    <button onClick={() => AddToCart(product.id)} className='btn bg-main my-3 text-white w-100 d-block'>Add To Cart</button>
                </div>
            </div>
        </div>
    </>
    )
}
