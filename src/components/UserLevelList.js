import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const UserLevelList = () => {
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [userLevels, setUserLevels] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        getUserLevel();
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

    const getUserLevel = async () => {
        const response = await axiosJwt.get('http://localhost:5000/user_levels', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setUserLevels(response.data);
    }

  return (
    <div className='container mt-5'>
        <table className='table is-striped is-fullwidth mt-5'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                </tr>
            </thead>
            <tbody>
                {userLevels.map((userLevel, index) => (
                    <tr key={userLevel.id}>
                        <td>{index+1}</td>
                        <td>{userLevel.nama}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserLevelList