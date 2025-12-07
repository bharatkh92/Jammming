import Nav from "../components/Nav/Nav";

export default function NavContainer({
  isLoggedIn,
  userProfile,
  setIsLoggedIn,
  setUserProfile,
  setUserPlaylists
}) {
  const handleLogout = (e) => {
    setIsLoggedIn(false);
    setUserProfile({});
    setUserPlaylists(undefined);
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("code_verifier");
  };
  return <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} userProfile={userProfile} />;
}
