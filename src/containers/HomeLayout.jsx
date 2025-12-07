import { useState } from "react";
import { Outlet } from "react-router";
import NavContainer from "./NavContainer";

export default function HomeLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("spotify_access_token"))
  );
  const [userProfile, setUserProfile] = useState({
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("userId"),
  });
  const [userPlaylists, setUserPlaylists] = useState([]);

  return (
    <div>
      <NavContainer
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        setIsLoggedIn={setIsLoggedIn}
        setUserProfile={setUserProfile}
        setUserPlaylists={setUserPlaylists}
      />
      <Outlet
        context={{
          isLoggedIn,
          setIsLoggedIn,
          userProfile,
          setUserProfile,
          userPlaylists,
          setUserPlaylists,
        }}
      />
    </div>
  );
}
