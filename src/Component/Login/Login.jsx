import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
// import ForgrtPassword from '../ForgrtPassword/ForgrtPassword';


export default function Login() {
  let { getUserCart, setItemNum } = useContext(CartContext)
  let { setUserToken } = useContext(UserContext)
  let navg = useNavigate()
  let [errMessage, setErrMessage] = useState('')
  let [loading, setLoading] = useState(true)

  async function LoginUser(value) {

    setLoading(false)

    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value).catch((err) => {

      setErrMessage(err.response.data.message)
      setLoading(true)

    })
    if (req.data.message == 'success') {

      console.log(req);
      setLoading(true)
      setUserToken(req.data.token)
      localStorage.setItem('userToken', req.data.token)
      getUserCart()
      navg('/home')
    }
  }
  async function getUserData() {
    let req = await getUserCart().catch((err)=>{
      console.log(err);
    })
    console.log(req);
    if (req?.data?.status == 'success') {
      setItemNum(req.data.numOfCartItems)
    }
  }

  async function ForgetPassword(value) {
    navg('/forgetPassword')
  }
  ///////////////////////// validation /////////////////////////
  let validationSchema = yup.object({
    email: yup.string().required('email is required').email('Enter Valid email'),
    password: yup.string().required('password is required').matches(/^[A-Z][a-zA-Z!@#$%^*(_0-9]{6,16}$/, 'Enter Valid Password'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: LoginUser,
    validationSchema,
  })

  return (
    <div className='container'>
      <h3 className='my-3'>Login Now...</h3>
      {errMessage != '' ? <div className='alert alert-danger'>{errMessage}</div> : ''}
      <form onSubmit={formik.handleSubmit} >


        <div>
          <label htmlFor='email'>Email:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='email' type='email' id='email'></input>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> : ''}
        </div>


        <div>
          <label htmlFor='password'>Password:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='password' type='password' id='password'></input>
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> : ''}
        </div>
        <h6 onClick={ForgetPassword}>Forget Passwoooorddd......?</h6>


        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 ' >Login</button>
          : <button type='button' className='btn bg-main text-white mt-2 ' ><i className='fa-solid fa-spinner fa-spin'></i></button>
        }

      </form>
    </div>
  )
}
