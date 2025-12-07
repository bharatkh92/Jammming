import { useEffect, useRef } from "react";
import { getToken } from "./authCodeWithPkce";
import { useNavigate, useOutletContext } from "react-router";

export default function Callback() {
  const { setIsLoggedIn, setUserProfile, setUserPlaylists } = useOutletContext();
  let navigate = useNavigate();
  const isGetTokenCalled = useRef(false);
  useEffect(() => {
    const useAuthCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (!isGetTokenCalled.current && code) {
        isGetTokenCalled.current = true;
        const newToken = await getToken(code, setUserProfile, setUserPlaylists);
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
