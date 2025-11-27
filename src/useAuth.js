import { useEffect } from "react"
import { getToken, getUserAuth } from "./authCodeWithPkce";

export const useAuth = () => {
    useEffect(() => {
        const spotify_access_token = localStorage.getItem('spotify_access_token');
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if(spotify_access_token){
            // setIsLoggedIn(true);
        }else if(!code && !spotify_access_token){
            // setIsLoggedIn(false);
            getUserAuth();
        }else if(code && !spotify_access_token) {
            // setIsLoggedIn(false);
            getToken(code);
        }
    }, [])
}