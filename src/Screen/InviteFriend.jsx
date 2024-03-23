import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
export default function InviteFriend() {
    const location = useLocation();
    const navigate = useNavigate()
  useEffect(() => {
  
   if(location){
    const paramArr = location.pathname.split("/")
    const token = paramArr[2]
    localStorage.setItem("inviteToken", JSON.stringify(token))
    navigate("/accounts/signup")
   }
  }, [location]);

  return <div></div>;
}
