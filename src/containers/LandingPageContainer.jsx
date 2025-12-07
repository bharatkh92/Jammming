import { useOutletContext } from "react-router";
import LandingPage from "../components/LandingPage/LandingPage";

export default function LandingPageContainer() {
    const { isLoggedIn, userProfile } = useOutletContext();
    
    return(
        <LandingPage isLoggedIn={isLoggedIn} userProfile={userProfile} />
    );
}