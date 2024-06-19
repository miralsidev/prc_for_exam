import { TextField } from '@mui/material'
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup'

const UpdateForm = ({ show, data, userId, handleClose, displayUser }) => {
    console.log('data=', data);
    const validationSchema = yup.object({
        name: yup.string().required('name is required'),
        Phone: yup.number().required('number is required'),

        email: yup.string().required('email is required').email('valid addres'),

        password: yup.string().required('name is password').min(6, 'enter at lest 6 chracter'),

    })
    const handleSubmit = async (values) => {
        console.log(values);
        const res = await axios.put(`http://localhost:3000/user/updateData/${userId}`, {
            name: values.name,
            email: values.email,
            Phone: values.Phone,
        })
        console.log('res==', res);
        alert('res done')
        handleClose()
        displayUser()
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>update form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik validationSchema={validationSchema}
                        initialValues={{
                            name: data?.name || '',
                            email: data?.email || '',
                            password: '',
                            Phone: data?.Phone || ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Field as={TextField} label='enter the name' name='name'>

                            </Field>
                            <ErrorMessage name='name' />
                            <Field as={TextField} label='enter the phone' name='Phone'>

                            </Field>
                            <ErrorMessage name='Phone' />

                            <Field as={TextField} label='enter the email' name='email'>

                            </Field>
                            <ErrorMessage name='email' />

                            <Field as={TextField} label='enter the passord' name='password' type='password'>

                            </Field>
                            <ErrorMessage name='password' />
                            <button type='submit' >update</button>

                        </Form>
                    </Formik>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default UpdateForm
