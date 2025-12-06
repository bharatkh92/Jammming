import Nav from "../components/Nav/Nav";

export default function NavContainer({
  isLoggedIn,
  setIsLoggedIn,
  username,
  setUsername
}) {
  const handleLogout = (e) => {
    setIsLoggedIn(false);
    setUsername(undefined)
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("username");
  };
  return <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />;
}
