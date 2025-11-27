import { useEffect } from "react"
import { getToken } from "./authCodeWithPkce";
import { useNavigate, useOutletContext } from "react-router";

export default function Callback(){
    const {isLoggedIn, setIsLoggedIn } = useOutletContext();
    let navigate = useNavigate();
  useEffect(() => {
        if(!isLoggedIn){
            const useAuthCode = async () => {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                if(code) {
                    try {
                        const newToken = await getToken(code, setIsLoggedIn);
                        if(newToken) {
                            console.log('inside if block');
                            console.log(`inside if block logging in newToken ${newToken}`);
                            navigate("/app");
                        }
                    } catch(e) {
                        console.log(e)
                    }
                    
                } else {
                    navigate('/app')
      }
    }
            useAuthCode();
        } else {
            navigate('/app');
        }
  }, []);
    return(<p>...loading</p>)
}