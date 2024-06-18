
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

const DisplayUser = () => {
    const [user, setuser] = useState([]);
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        displayUser()
    }, [])
    const displayUser = async (values) => {
        const res = await axios.get('http://localhost:3000/user/getUser')
        setuser(res.data)
    }
    const viewsData = (user) => {
        console.log('viwes data user = ', user);
        setUserData(user)
    }
    return (
        <>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                           {console.log(userData)}
                            <h5 class="modal-title" id="exampleModalLongTitle">Profile</h5><br />

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <h5 class="modal-title" id="exampleModalLongTitle">{userData?.email}</h5>
                        <div><hr />
                        <h5 class="modal-title" id="exampleModalLongTitle">{userData?.name}</h5><br />

                        </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log('user--', user.data)}
            <table className='table '>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>action</th>
                </tr>

                {

                    user?.data?.map((user) => (
                        <tr>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.Phone}
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => viewsData(user)}>
                                    views
                                </button>
                                {/* <Button variant="secondary" onClick={()=>viewsData(user)}>views</Button> */}
                            </td>
                        </tr>

                    ))
                }
            </table>

        </>
    )
}

export default DisplayUser
