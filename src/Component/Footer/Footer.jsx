import React from 'react'

export default function Footer() {
  return (<div className='bg-light p-5'>

    <div className='container'>
      <div className=' '>
        <h4>Get the FreshCart app</h4>
        <p>we will send you a link, open it on your phone to download the app</p>
        <div className='d-flex '>

          <input placeholder='Emai..' className='form-control w-75 mx-2'></input>
          <button className='bg-main text-white btn justify-content-center align-items-center mx-5'>Share App Link</button>
        </div>
      </div>
      <div className='border-top border-bottom my-3 py-2'>
        <p>Payment Partners <i className='fa-brands fa-cc-visa '></i>
        <i className='fa-brands fa-cc-mastercard mx-2'></i>
        <i className='fa-brands fa-paypal me-2'></i>
        <i className='fa-brands fa-amazon'></i>
        </p>
      </div>
    </div>
  </div>
  )
}
