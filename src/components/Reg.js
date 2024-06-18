import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Reg = () => {
    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup.string().required('name is required'),
        email: yup.string().required('email is required').email('valid addres'),
        password: yup.string().required('password is required'),
        Phone: yup.string().required('phone is required')

    })
    const handleSubmite = async (values, { resetform }) => {
        console.log('values--', values

        );
        const res = await axios.post('http://localhost:3000/user/addUser', {
            name: values.name,
            email: values.email,
            password: values.password,
            Phone: values.Phone
        })
        console.log('res-', res);
        console.log('res.data.status-', res.data.status);

        if (res.data.status === 200) {
            const notify = (cb) => {
                toast(res.data.message,{onClose:cb})
            }
            notify(() => navigate('/home'))
            resetform()
        }
    }
    return (
        <>
            <Formik validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    Phone: '',
                    email: '',
                    password: ''
                }}
                onSubmit={handleSubmite}
            >
                <Form>
                    <Field as={TextField} label='enter your name' name='name'>

                    </Field>
                    <ErrorMessage name='name' />
                    <Field as={TextField} label='enter your email' name='email'>

                    </Field>
                    <ErrorMessage name='email' />

                    <Field as={TextField} label='enter your password' name='password' type='password'>

                    </Field>
                    <ErrorMessage name='password' />

                    <Field as={TextField} label='enter your Phone number' name='Phone'>

                    </Field>
                    <ErrorMessage name='Phone' />

                    <button type='submit'>add submit</button>
                </Form>
            </Formik>
        </>
    )
}
export default Reg