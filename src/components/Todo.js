import { TextField } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
const Todo = () => {
  const [userData, setUserData] = useState(null);
  const [selectedfile, setselectedFile] = useState([]);
  const [SerchTerm,setSerchTerm] = useState('')
  const [filterTodo, setFilterTodo] = useState([])
  const handlesubmite = async (values) => {
    console.log("values=", values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    for (let i = 0; i < selectedfile.length; i++) {
      formData.append("files", selectedfile[i]);
    }
    const res = await axios.post(
      "http://localhost:3000/todo/addtodo",
      formData
    );
    console.log("res=", res);
  };
  const handleFileSubmit = (event) => {
    setselectedFile(event.currentTarget.files);
  };
  useEffect(() => {
    displaydata();
  }, []);
  let token =localStorage.getItem('token')
console.log('token=',token);
  const displaydata = async (values) => {
    const res = await axios.get("http://localhost:3000/todo/alldata",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    console.log("res data= ", res.data);
    setUserData(res.data);
  };
useEffect(()=>{
  setFilterTodo(
    userData?.data.filter(userData=>
      userData.title.toLowerCase().includes(SerchTerm.toLowerCase())||
      userData.description.toLowerCase().includes(SerchTerm.toLowerCase())
    ) || []
  )
},[SerchTerm,userData])
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={handlesubmite}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field as={TextField} name="title" label="enter the title"></Field>
            <Field
              as={TextField}
              name="description"
              label="enter the description"
            ></Field>
            <input
              type="file"
              name="files"
              multiple
              onChange={(event) => {
                handleFileSubmit(event);
                setFieldValue(event.currentTarget.files);
              }}
            />
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>

      <h1>all data are </h1>
      <input placeholder="enter data" value={SerchTerm} onChange={(e)=>setSerchTerm(e.currentTarget.value)}  type="text" class="form-control"/>
      <table className="table">
  <tbody>
    <tr>
      <th>title</th>
      <th>description</th>
      <th>image</th>
    </tr>
    {filterTodo.map((userData)=>(
    // {userData?.data.map((userData) => (
      <tr key={userData.title}>
        <td>{userData.title}</td>
        <td>{userData.description}</td>
        {console.log(userData.files, "files")}
        <td>
          {userData.files.map((abc) => (
       
            <img
              key={abc.path}
              alt="loading"
              src={`http://localhost:3000/${abc.path}`}
              style={{ width: "30px", height: "30px", marginRight: "5px" }}
            />
          ))}{" "}
        </td>
      </tr>
    ))}
  </tbody>
</table>


    </>
  );
};

export default Todo;
