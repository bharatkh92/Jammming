import { useState } from "react";
import { Outlet, useNavigate } from "react-router";

export default function HomeLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('spotify_access_token')));
  let navigate = useNavigate(); 
  const handleOnlcick = (e) => {
    if(e.target.innerText === 'Login'){
      navigate("/app");
    } else {
      navigate("/callback")
    }
  }
  return (
    <div>
      <h1>{isLoggedIn? 'Yes Logged In': 'No Logged In '}</h1>
      <p onClick={handleOnlcick}>header</p>
      <Outlet context={{ isLoggedIn, setIsLoggedIn}} />
      <p onClick={handleOnlcick} >Login</p>
    </div>
  );
  
}
