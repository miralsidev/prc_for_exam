import { TextField } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
const Todo = () => {
    const [userData, setUserData] = useState(null)
    const [selectedfile, setselectedFile] = useState([])
    const handlesubmite = async (values) => {
        console.log('values=', values);
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('description', values.description)
        for (let i = 0; i < selectedfile.length; i++) {
            formData.append('files', selectedfile[i])
        }
        const res = await axios.post('http://localhost:3000/todo/addtodo', formData)
        console.log('res=', res);
    }
    const handleFileSubmit = (event) => {
        setselectedFile(event.currentTarget.files
        )
    }
    useEffect(() => {
        displaydata()
    }, [])
    const displaydata = async (values) => {
        const res = await axios.get('http://localhost:3000/todo/alldata')
        console.log('res data= ', res.data);
        setUserData(res.data)
    }
    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    description: ''
                }}
                onSubmit={handlesubmite}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <Field as={TextField} name='title' label="enter the title">

                        </Field>
                        <Field as={TextField} name='description' label="enter the description">

                        </Field>
                        <input
                            type='file'
                            name='files'
                            multiple
                            onChange={(event) => {
                                handleFileSubmit(event)
                                setFieldValue(event.currentTarget.files)
                            }}
                        />
                        <button type='submit'>submit</button>
                    </Form>
                )}

            </Formik>

            <h1>all data are </h1>


            <table className='table'>
                <tr>
                    <th>title</th>
                    <th>descraption</th>
                    <th>image</th>
                </tr>
                {
                    userData?.data.map((userData) => (
                        <tr>
                            <td>{userData.title}</td>
                            <td>{userData.description}</td>
                            {console.log(userData.files, 'files')}
                            <td>
                                {userData.files.map((abc) => (

                                    <img
                                        alt='loding'
                                        src={`http://localhost:3000/${abc.path}`}
                                        style={{ width: '30px', height: '30px', marginRight: '5px' }}

                                    />
                                ))}                            </td>

                        </tr>
                    )

                    )
                }
            </table>
            {/* <td>
                {
                  todo.files.map((todo, index) => (

                    <img
                      key={index}
                      alt={`img-${index}`}
                      src={`http://localhost:5000/${todo.path}`}
                      style={{ width: '90px', height: '90px', marginRight: '5px' }}
                    />
                  )
                  )
                }
              </td> */}

        </>
    )
}

export default Todo

