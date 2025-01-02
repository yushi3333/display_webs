import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () =>{
        try{
            const usersResponse = await axios.get('http://0.0.0.0:3002/api/users/allUsers');
            console.log('Fetched users:', usersResponse.data);
            setUsers(usersResponse.data)
        }catch(error){
            console.error('Failed to fetch users', error);
        }
        
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    const handleDelete = async (singleUser)=>{
        try{
            await axios.delete(`http://0.0.0.0:3002/api/users/${singleUser._id}`);
            setUsers(users.filter((user)=> user._id) !== singleUser._id)
            fetchUsers();

        }catch(error){

        }

    }

    
  return (
    <div>
        <Table striped bordered hover variant="dark"> 
          <thead>
            <tr>
              <th>username</th>
              <th>email</th>
              <th>role</th>
              <th>password</th>
              
              <th>Action</th>
            
            </tr>
           
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.password}</td>
                
                
                <td>
                  {/* <button onClick={() => handleEdit(user)}>Edit</button> */}
                  <button onClick={() => handleDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
    

  )
}

export default UserBoard