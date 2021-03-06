import { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import dateFormat from 'dateformat';

const ProposalList = () => {
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [userLevels, setUserLevels] = useState([]);
    const history = useNavigate();

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

    // start form
    const [proposals, setProposal] = useState([]);

    useEffect(() => {
        getProposal();
    }, []);

    const getProposal = async () => {
        const response = await axiosJwt.get('http://localhost:5000/proposals', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setProposal(response.data);
    }

    const deleteProposal = async (id) => {
        await axiosJwt.delete('http://localhost:5000/proposals/'+id,  {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        getProposal();
    }

  return (
    <div className='container mt-5'>
        <Link to='/proposal/add' className='button is-primary mt-3'>Tambah Data</Link>
        <table className='table is-striped is-fullwidth mt-5'>
          <thead>
            <tr>
              <th rowSpan='2' colSpan='1' className='has-text-centered'>No</th>
              <th rowSpan='2' colSpan='1' className='has-text-centered'>Company</th>
              <th rowSpan='2' colSpan='1' className='has-text-centered'>Name</th>
              <th rowSpan='1' colSpan='4' className='has-text-centered'>Proposal Event</th>
              {/* <th rowSpan='2' colSpan='1' className='has-text-centered'>Status</th>
              <th rowSpan='2' colSpan='1' className='has-text-centered'>Confirmed By</th>
              <th rowSpan='2' colSpan='1' className='has-text-centered'>Comment</th> */}
              <th rowSpan='2' colSpan='1' className='has-text-centered'>Action</th>
            </tr>
            <tr>
              <th className='has-text-centered'>Date 1</th> 
              <th className='has-text-centered'>Date 2</th>
              <th className='has-text-centered'>Date 3</th>
              <th className='has-text-centered'>Location</th>
            </tr>
          </thead>
          <tbody>
              { proposals.map((proposal_row, proposal_key) => (
                <tr key={ proposal_row.id }>
                    <td>{ proposal_key + 1 }</td>
                    <td>{ proposal_row.company }</td>
                    <td>{ proposal_row.event_name }</td>
                    <td>{ dateFormat(proposal_row.event_date, "dd/mm/yyyy") }</td>
                    <td>{ dateFormat(proposal_row.event_date2, "dd/mm/yyyy") }</td>
                    <td>{ dateFormat(proposal_row.event_date3, "dd/mm/yyyy") }</td>
                    <td>{ proposal_row.event_location }</td>
                    {/* <td>{ proposal_row.status==0 ? 'Pending' : (proposal_row.status==2 ? 'Approve' : 'Reject') }</td>
                    <td>{ proposal_row.update_by!=null ? proposal_row.User.nama+' ('+dateFormat(proposal_row.updatedAt, "dd/mm/yyyy hh:ss")+')' : '-' }</td>
                    <td>{ proposal_row.komen }</td> */}
                    <td>
                        {/* <Link to={'/proposal/edit/'+proposal_row.id} className='button is-small is-info'>Edit</Link> */}
                        <button onClick={() => deleteProposal(proposal_row.id) } className='button is-small is-danger'>Delete</button>
                    </td>
                </tr>
              ))}
          </tbody>
        </table>
        
    </div>
  )
}

export default ProposalList
