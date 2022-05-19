import React, {useState, useEffect} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
        getUser();
    },[]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
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
            setNama(decoded.nama);
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

    const Logout = async () => {
        try {
        await axios.delete("http://localhost:5000/logout");
        history("/");
        } catch (error) {}
    };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="http://localhost:3000/dashboard">
            <img
              src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
              width="112"
              height="60"
              className="mr-5"
              alt="logo"
            />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="http://localhost:3000/dashboard" className="navbar-item">
                Home
            </a>
            
            { userLevel=='superadmin' ? 
              <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Master</a>

                  <div className="navbar-dropdown">
                      <a href="http://localhost:3000/user" className="navbar-item">
                          User
                      </a>
                      <a href="http://localhost:3000/user_level" className="navbar-item">
                          User Level
                      </a>
                  </div>
              </div>
            : '' }

            { userLevel!='vendor' ? 
              <a href="http://localhost:3000/proposal" className="navbar-item">
                  Proposal
              </a>
            : '' }

            { userLevel!='hr' ? 
                <a href="http://localhost:3000/approval" className="navbar-item">
                    Approval
                </a>
            : '' }

            <a href="http://localhost:3000/monitoring" className="navbar-item">
                Monitoring
            </a>

          </div>

          <div className="navbar-end">
            <div className="navbar-item">                
                <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">{nama} ({userLevel})</a>

                <div className="navbar-dropdown">
                    <a className="navbar-item" onClick={Logout}>Logout</a>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
