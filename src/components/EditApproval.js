import { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';

const EditApproval = () => {
    const [userId, setUserId] = useState('');
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [userLevels, setUserLevels] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
        getProposalById();
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
    const [company, setCompany] = useState('');
    const [event_date, setEvent_date] = useState('');
    const [event_date2, setEvent_date2] = useState('');
    const [event_date3, setEvent_date3] = useState('');
    const [event_location, setEvent_location] = useState('');
    const [status, setStatus] = useState('');
    const [event_date_deal, setEvent_date_deal] = useState('');
    const [created_by, setCreated_by] = useState('');
    const [update_by, setUpdate_by] = useState('');
    const [updateAt, setUpdateAt] = useState('');
    const [komen, setKomen] = useState('');
    const { id } = useParams();

    const approva_date = async (e) => {
        e.preventDefault();
        
        await axiosJwt.patch('http://localhost:5000/approvals/'+id, {
            event_date_deal: event_date,
            status: 1,
            update_by: userId,
            
            headers:{
                Authorization: `Bearer ${token}`
            }
        });    

        alert('Data berhasil approve!');

        history('/approval/edit/'+id);
        refreshToken();
        getProposalById();
    }

    const approva_date2 = async (e) => {
        e.preventDefault();
        
        await axiosJwt.patch('http://localhost:5000/approvals/'+id, {
            event_date_deal: event_date2,
            status: 1,
            update_by: userId,
            
            headers:{
                Authorization: `Bearer ${token}`
            }
        });    

        alert('Data berhasil approve!');

        history('/approval/edit/'+id);
        refreshToken();
        getProposalById();
    }

    const approva_date3 = async (e) => {
        e.preventDefault();
        
        await axiosJwt.patch('http://localhost:5000/approvals/'+id, {
            event_date_deal: event_date3,
            status: 1,
            update_by: userId,
            
            headers:{
                Authorization: `Bearer ${token}`
            }
        });    

        alert('Data berhasil approve!');

        history('/approval/edit/'+id);
        refreshToken();
        getProposalById();
    }

    const disapproval = async (e) => {
        e.preventDefault();
        
        await axiosJwt.patch('http://localhost:5000/approvals/'+id, {
            status: 2,
            update_by: userId,
            komen: komen,
            
            headers:{
                Authorization: `Bearer ${token}`
            }
        });    

        alert('Data telah disapprove!');

        history('/approval/edit/'+id);
        refreshToken();
        getProposalById();
    }

    const getProposalById = async () => {
        const response = await axiosJwt.get('http://localhost:5000/approvals/'+id, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        setEvent_name(response.data.event_name);
        setCompany(response.data.company);
        setEvent_date(dateFormat(response.data.event_date, "dd/mm/yyyy"));
        setEvent_date2(dateFormat(response.data.event_date2, "dd/mm/yyyy"));
        setEvent_date3(dateFormat(response.data.event_date3, "dd/mm/yyyy"));
        setEvent_date_deal(dateFormat(response.data.event_date_deal, "dd/mm/yyyy"));
        setEvent_location(response.data.event_location);
        setStatus(response.data.status);
        setCreated_by(response.data.created_by);
        setUpdate_by(response.data.User ? response.data.User.nama : '');
        setUpdateAt(dateFormat(response.updateAt, "dd/mm/yyyy hh:ss"));
        setKomen(response.data.komen ?? '');
    }

  return (
    <div className='container mt-5'>
            <h3 className="subtitle is-3 mb-5">Approve Event</h3>
            
            { status==1 ? 
                <article className="message is-primary">
                    <div className="message-header">
                        <p>Approved by {update_by +' ('+ updateAt +')'}</p>
                    </div>
                </article>
            : (status==2 ? <article className="message is-danger">
                    <div className="message-header">
                        <p>Rejected by {update_by +' ('+ updateAt +')'}</p>
                    </div>
                </article> : '')
            }            

            <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'>Company</label>
                        <input
                            value={ company }
                            onChange={ (e) => setCompany(e.target.value) }
                            className='input is-primary' type='text' placeholder='Company Name' required readOnly/>
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
                            className='input is-primary' type='text' placeholder='Event Name' required readOnly/>
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
                            className='input is-primary' type='text' placeholder='Event Location' required readOnly/>
                    </div>
                </div>
            </div>
            { status!=1 ? 
            <div className="columns is-desktop">
                <div className="column">
                    <form onSubmit={ approva_date }>
                        <div className='field'>
                            <label className='label'> Date 1</label>
                            <div className="field has-addons">
                                <div className="control">
                                    <input
                                        value={ event_date }
                                        onChange={ (e) => setEvent_date(e.target.value) }
                                        className='input is-info' type='text' placeholder='' required readOnly/>
                                </div>
                                <div className="field control">
                                    { status==0 ? <button className="button is-info">Approve Date 1</button> : ''}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="column">
                    <form onSubmit={ approva_date2 }>
                        <div className='field'>
                            <label className='label'> Date 2</label>
                            <div className="field has-addons">
                                <div className="control">
                                    <input
                                        value={ event_date2 }
                                        onChange={ (e) => setEvent_date2(e.target.value) }
                                        className='input is-info' type='text' placeholder='' required readOnly/>
                                </div>
                                <div className="field control">
                                    { status==0 ? <button className="button is-info">Approve Date 2</button> : ''}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="column">
                    <form onSubmit={ approva_date3 }>
                    <div className='field'>
                        <label className='label'> Date 3</label>
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    value={ event_date3 }
                                    onChange={ (e) => setEvent_date3(e.target.value) }
                                    className='input is-info' type='text' placeholder='' required readOnly/>
                            </div>
                            <div className="field control">
                                { status==0 ? <button className="button is-info">Approve Date 3</button> : ''}
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            : <div className="columns is-desktop">
                <div className="column">
                    <div className='field'>
                        <label className='label'> Date </label>
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    value={ event_date_deal }
                                    className='input is-info' type='text' placeholder='' required readOnly/>
                            </div>
                            <div className="field control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            { status==0 ? <code><i>** please select the date button for approval</i></code> : '' }
        <hr></hr>
        { status!=1 ? <h4 className="subtitle is-4 mt-3 mb-1">Disapproval</h4> : '' }                            
        { status!=1 ?
            <form onSubmit={ disapproval }>
                <div className="columns is-desktop">
                    <div className="column">
                        <div className='field'>
                            <label className='label'> Comment</label>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input
                                        value={ komen }
                                        onChange={ (e) => setKomen(e.target.value) }
                                        className='input is-danger' type='text' placeholder='let us know your suggestions'/>
                                </div>
                                <div className="field control">
                                    { status==0 ? <button className="button is-danger">Disapprove</button> : ''}                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { status==0 ? <code><i>** please fill in the comments column and select the button for disapproval</i></code> : '' }
            </form>
        : '' }
        <hr></hr>
    </div>
  )
}

export default EditApproval