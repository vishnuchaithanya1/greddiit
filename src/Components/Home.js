import { BottomNavigation } from '@mui/material';
import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bottomnav from "./Bottomnav"
function Home() {
    const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
        
    }
    else{
      navigate('/login');
    }
  }, [])
  return (
    
    <Bottomnav/>
  )
}

export default Home