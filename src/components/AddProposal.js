import { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AddProposal = () => {
    const [userId, setUserId] = useState('');
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [userLevels, setUserLevels] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
    },[]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setNama(decoded.nama);
            setUserLevel(decoded.userLevel);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
                history('/');
            }            
        }
    }

    const axiosJwt = axios.create();

    axiosJwt.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setNama(decoded.nama);
            setUserLevel(decoded.userLevel);
            setExpire(decoded.exp);
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // start form
    const [event_name, setEvent_name] = useState('');
    const [company, setCompany] = useState('PT Kesehatan Indonesia');
    const [event_date, setEvent_date] = useState('');
    const [event_date2, setEvent_date2] = useState('');
    const [event_date3, setEvent_date3] = useState('');
    const [event_location, setEvent_location] = useState('');
    const [status, setStatus] = useState(0);

    const saveProposal = async (e) => {
        e.preventDefault(); // biar gak reload page
        
        await axiosJwt.post('http://localhost:5000/proposals', {
            event_name: event_name,
            company: company,
            event_date: event_date,
            event_date2: event_date2,
            event_date3: event_date3,
            event_location: event_location,
            status: status,
            created_by: userId,

            headers:{
                Authorization: `Bearer ${token}`
            }
        });    

        alert('Data proposal berhasil dibuat!');

        history('/proposal');
    }

  return (
    <div className='container mt-5'>
        <form onSubmit={ saveProposal }>
            <h3 className="subtitle is-3 mb-5">Add Event</h3>
            <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'>Company</label>
                        <input
                            value={ company }
                            onChange={ (e) => setCompany(e.target.value) }
                            className='input' type='text' placeholder='Company Name' required/>
                    </div>
                </div>
                <div className="column">
                </div>
                <div className="column">
                </div>
            </div>
            <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'>Event Name</label>
                        <input
                            value={ event_name }
                            onChange={ (e) => setEvent_name(e.target.value) }
                            className='input' type='text' placeholder='Event Name' required/>
                    </div>
                </div>
                <div className="column">
                </div>
                <div className="column">
                </div>
            </div>
            <hr></hr>
            <h4 className="subtitle is-4 mt-3 mb-1">Proposal</h4>
            <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'> Location</label>
                        <input
                            value={ event_location }
                            onChange={ (e) => setEvent_location(e.target.value) }
                            className='input' type='text' placeholder='Event Location' required/>
                    </div>
                </div>
            </div>
            <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'> Date 1</label>
                        <input
                            value={ event_date }
                            onChange={ (e) => setEvent_date(e.target.value) }
                            className='input' type='date' placeholder='' required/>
                    </div>
                </div>
                <div className="column">
                    <div className='field'>
                        <label className='label'>Date 2</label>
                        <input
                            value={ event_date2 }
                            onChange={ (e) => setEvent_date2(e.target.value) }
                            className='input' type='date' placeholder='' required/>
                    </div>
                </div>
                <div className="column">
                    <div className='field'>
                        <label className='label'>Date 3</label>
                        <input
                            value={ event_date3 }
                            onChange={ (e) => setEvent_date3(e.target.value) }
                            className='input' type='date' placeholder='' required/>
                    </div>
                </div>
            </div>
            <div className='field'>
                <button className="button is-primary">Simpan</button>
            </div>
        </form>

    </div>
  )
}

export default AddProposal