import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'


export default function Register() {
  let navg = useNavigate()
  let [errMessage, setErrMessage] = useState('')
  let [loading, setLoading] = useState(true)

  function RegisterForm(val) {
    setLoading(false)
    let req = axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch(function (err) {
      setErrMessage(err.response.data.message)
      setLoading(true)
      console.log();
    })
    if (req?.data.message == 'success') {
      navg('/login')
      setLoading(true)
    }
    console.log(req);
  }

  let validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, 'min char 3').max(20, 'max char 20'),
    phone: yup.string().required().matches(/^01[1250][0-9]{8}$/, 'Enter Valid Phone'),
    email: yup.string().required('Email is required').email('Enter Valid email'),
    password: yup.string().required('Password is required').matches(/^[A-Z][a-zA-Z!@#$%^*(_0-9]{6,16}$/, 'Enter Valid Password'),
    rePassword: yup.string().required('Re Password').oneOf([yup.ref('password', 'Password NOt Match')])
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: RegisterForm,
    validationSchema,
  })

  return (
    <div className='container'>
      <h3 className='my-3'>Register Now...</h3>
      {errMessage != '' ? <div className='alert alert-danger'>{errMessage}</div> : ''}
      
      <form onSubmit={formik.handleSubmit} >

        <label htmlFor='name'>Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='name' type='text' id='name'></input>
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2'>{formik.errors.name}</div> : ''}

        <label htmlFor='phone'>Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='phone' type='tel' id='phone'></input>
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-2'>{formik.errors.phone}</div> : ''}


        <label htmlFor='email'>Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='email' type='email' id='email'></input>
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> : ''}


        <label htmlFor='password'>Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='password' type='password' id='password'></input>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> : ''}


        <label htmlFor='rePassword'>RePassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='rePassword' type='password' id='rePassword'></input>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger p-2'>{formik.errors.rePassword}</div> : ''}

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 ' >Register</button>
          : <button type='button' className='btn bg-main text-white mt-2 ' ><i className='fa-solid fa-spinner fa-spin'></i></button>
        }

      </form>
    </div>
  )
}
