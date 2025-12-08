import { useEffect, useRef } from "react";
import { getToken } from "./authCodeWithPkce";
import { useNavigate, useOutletContext } from "react-router";

export default function Callback() {
  const { setIsLoggedIn, setUserProfile, userPlaylists, setUserPlaylists } = useOutletContext();
  let navigate = useNavigate();
  useEffect(() => {
    const useAuthCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        const newToken = await getToken(code, setUserProfile, userPlaylists, setUserPlaylists);
        if (newToken) {
          setIsLoggedIn(true);
          navigate("/app");
        }
      } else {
        navigate("/app");
      }
    };
    useAuthCode();
  }, []);
  return <p>...loading</p>;
}
