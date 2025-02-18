import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { getUserCart, removeCart, clearCart, setItemNum, updateCart } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    getUserData()

  }, [])

  // async function getUserData() {
  //   setLoading(true)
  //   let req = await getUserCart().catch((err) => {
  //     console.log(err);
  //     if (req.response.data.statusMsg == 'fail') {
  //         setCartData(null)
  //         setLoading(false)
  //     }
  //   })
  //   if (req?.data?.status === 'success') {
  //     setLoading(false)
  //     setCartData(req.data.data)
  //   }
  // }
  async function getUserData() {
    setLoading(true);

    let req = await getUserCart().catch((error) => {
      if (error.response && error.response.data.statusMsg === 'fail') {
        setCartData(null);
      }
      setLoading(false);

    })
    if (req?.data?.status === 'success') {
      setLoading(false);
      setCartData(req.data.data);
    }

  }
  async function removeItemFromCart(id) {
    let req = await removeCart(id)
    console.log(req);
    if (req.data.status === 'success') {
      setLoading(false)
      setItemNum(req.data.numOfCartItems)
      setCartData(req.data.data)
    }
  }
  async function clearCartData() {
    let req = await clearCart().catch((err) => {
      console.log(err);
    })
    if (req?.data?.message === 'success') {
      setCartData(null)
    }
    console.log(req);
  }
  async function updateCartItem(id, count) {
    if (count == 0) {
      removeItemFromCart(id)
    } else {

      let req = await updateCart(id, count)
      console.log(req);
      if (req.data.status === 'success') {

        setCartData(req.data.data)
      }
    }
  }

  return (<>

    {loading ? <><div className='loading position-fixed d-flex justify-content-center align-items-center top-0 end-0 bottom-0 start-0 '>
      <span className="loader"></span>
    </div></> : <>
      {cartData == null ? <div className='alert alert-danger'>Your Cart is Empty</div> : <div className='container bg-light-subtle'>
        <button onClick={clearCartData} className='btn btn-danger btn-sm float-end'>Empty Cart</button>
        <div className='clearfix'></div>
        {cartData.products.map((el, id) => {
          return <div key={id} className='row  py-3 border-bottom border-3 align-items-center'>
            <div className='col-md-10'>
              <div className='row align-items-center'>
                <div className='col-md-1'>
                  <img className='w-100' src={el.product.imageCover} alt='' />
                </div>

                <div className='col-md-10 '>
                  <h6>{el.product.title}</h6>
                  <h6 className='muted'>{el.price} EGP</h6>
                  <button className='btn btn-danger btn-sm' onClick={() => { removeItemFromCart(el.product.id) }}>Remove<i className='fa-solid fa-trash'></i></button>
                </div>
              </div>
            </div>

            <div className='col-md-2'>
              <span onClick={() => updateCartItem(el.product._id, el.count += 1)} className='btn btn-success btn-sm'>
                <i className='fa-solid fa-plus'></i>
              </span>
              <span className='mx-2'>{el.count}</span>
              <span onClick={() => updateCartItem(el.product._id, el.count -= 1)} className='btn btn-danger btn-sm'>
                <i className='fa-solid fa-minus'></i>
              </span>

            </div>
          </div>
        })}
        <h3 className='text-main my-5 '>Total Price: {cartData.totalCartPrice}</h3>
        
        <Link to={'/checkout/' + cartData._id} className='btn bg-main text-white w-100'>Check Out Payment</Link>
      </div>}</>}
  </>
  )
}
