import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import NavContainer from "./NavContainer";

export default function HomeLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('spotify_access_token')));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  // const [username, setUsername] = useState(localStorage.getItem('username'));

  let navigate = useNavigate(); 
  // const handleOnlcick = (e) => {
  //   if(e.target.innerText === 'Login'){
  //     navigate("/app");
  //   } else {
  //     navigate("/callback")
  //   }
  // }

  

  return (
    <div>
      <NavContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} username={username}/>
      <Outlet context={{ isLoggedIn, setIsLoggedIn, username, setUsername}} />
    </div>
  );
  
}
