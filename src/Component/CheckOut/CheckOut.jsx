import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { CartContext } from '../Context/CartContext'

export default function CheckOut() {
    let { checkoutPayment } = useContext(CartContext)
    let validationSchema = yup.object({
        phone: yup.string().required("phone is required").matches(/^01[1250][0-9]{8}$/, 'Enter Valid Phone'),
        city: yup.string().required("city is required").matches(/^[\w-]{3,}$/, 'Enter Valid city'),
        details: yup.string(),
    })
    let data = useParams()
    let formik = useFormik({
        initialValues: {
            phone: '',
            city: '',
            details: '',

        },
        onSubmit: CheckoutPayment,
        validationSchema
    })

    async function CheckoutPayment(val) {
        let req = await checkoutPayment(data.id, val)
        if (req.data.status=='success'){
            // req.data.session.url
            // window.location.href=req.data.session.url
            window.open(req.data.session.url)
        }
        console.log(req);
    }

    return (<>
        <div className='container my-5'>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type='text' placeholder='Enter your city' name='city' />
                    {formik.touched.city && formik.errors.city ? <p className='text-danger'>{formik.errors.city} </p> : ''}
                </div>
                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type='tel' placeholder='Enter your phone' name='phone' />
                    {formik.touched.phone && formik.errors.phone ? <p className='text-danger'>{formik.errors.phone} </p> : ''}
                </div>
                <div className='mb-3'>
                    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' type='text' placeholder='Enter your details' name='details' />
                    {formik.touched.details && formik.errors.details ? <p className='text-danger'>{formik.errors.details} </p> : ''}
                </div>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white d-block w-100'>pay<i className='fa-brands fa-cc-visa mx-2'></i></button>
            </form>
        </div>
    </>
    )
}
