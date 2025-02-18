import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


export default function ForgrtPassword() {
    let [errmsg, setErr] = useState('')
    let [formStatus, setFormStatus] = useState(true)
    let navg = useNavigate()

    let validationSchema = yup.object({
        email: yup.string().required('Email required').email('Enter Valid Email'),
    })
    let validationSchema2 = yup.object({
        resetCode: yup.string().required('Email required').matches(/^[0-9]{5,6}$/, 'Enter Valid Code')
    })

    let Formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: ForgetPasswordApi,
        validationSchema
    })

    let Formik2 = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: verifyResetCode,
        validationSchema: validationSchema2
    })
    async function verifyResetCode(value) {
        let req = await axios.post(' https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch((err) => {
            setErr(err.response.data.message)
        })
        console.log(req);
        if (req.data.statusMsg == 'success') {
            navg('/ResetPassword')
        }
    }

    async function ForgetPasswordApi(value) {
        console.log(value);
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch((err) => {
            setErr(err.response.data.message)
            
            if (req.data.statusMsg == 'success') {
        
                setFormStatus(false)
            }
        })
        console.log(req);
    }

    return (
        <div>
            {errmsg ? <div className='alert alert-danger p-2 mt-2'>{errmsg}</div> : ''}
            {formStatus ?
                <form onSubmit={Formik.handleSubmit}>
                    <label htmlFor='email'>Enter Your Email</label>
                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control' type='text' id='email' name='email'></input>
                    <button type='submit' className='btn bg-main text-white my-2'>Send</button>
                </form>
                :
                <form onSubmit={Formik2.handleSubmit}>
                    <label htmlFor='resetCode'>Enter Your resetCodel</label>
                    <input onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} className='form-control' type='text' id='resetCode' name='resetCode'></input>
                    {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='alert alert-danger'>{Formik2.errors.resetCode}</div> : ''}
                    <button type='submit' className='btn bg-main text-white mt-2'>vriefy code</button>
                </form>
            }
        </div>
    )
}
