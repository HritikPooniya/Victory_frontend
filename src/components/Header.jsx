import React, { useEffect } from 'react';
import '../styles/Header.css';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  useEffect(()=>{
    if(!role){
      navigate('/')
    }

  },[navigate,role])
  return (
    <header className="topbar">
      <div className="welcome">Welcome Henry</div>
      <div href="/" className="logout" onClick={()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      navigate('/')


      }}>Logout</div>
    </header>
  );
};

export default Header;
