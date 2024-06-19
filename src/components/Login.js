import { TextField } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const handlesubmit = async(values)=>{
    console.log(values);
    const res = await axios.post('http://localhost:3000/user/login',{
      email:values.email,
      password:values.password
    })
    if(res.data.status === 200)
      {
        toast.success(res.data.message)
      }
      else if(res.data.status === 400){
        toast.error(res.data.message)

      }
    console.log('res = ',res.data);
    let token = localStorage.setItem('token',res.data.token)
  }
  return (

    <>
      <Formik 
    initialValues={{
      email:'',
      password:''
    }}
    onSubmit={handlesubmit}
      >
        <Form>
            <Field as={TextField} name='email' label='enter the email'></Field>
            <Field as={TextField} name='password' label='enter the password'></Field>
    <button type='submit'>login</button>
        </Form>
      </Formik>
    </>
  )
}

export default Login
