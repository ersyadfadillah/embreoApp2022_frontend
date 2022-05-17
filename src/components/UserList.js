import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const UserList = () => {
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        getUser();
    },[]);

    const axiosJwt = axios.create();

    axiosJwt.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            
            const decoded = jwt_decode(response.data.accessToken);
            setNama(decoded.nama);
            setUserLevel(decoded.userLevel);
            setExpire(decoded.exp);
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUser = async () => {
        const response = await axiosJwt.get('http://localhost:5000/users', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

  return (
    <div className='container mt-5'>
        <table className='table is-striped is-fullwidth mt-5'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>User Level</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index+1}</td>
                        <td>{user.nama}</td>
                        <td>{user.email}</td>
                        <td>{user.UserLevel.nama}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserList