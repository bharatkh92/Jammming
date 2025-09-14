// Callback.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const clientId = "66658c358a2d4036983a5e036dad9f41"; // <-- your Spotify client ID
    const redirectURI = "https://codecademyjammingbharatkh92.netlify.app/callback"; // your redirect URI

    if (!code) return;

    async function getAccessToken() {
      try {
        const verifier = localStorage.getItem("verifier");

        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectURI,
            code_verifier: verifier,
          }),
        });

        const data = await response.json();
        const { access_token } = data; // Spotify returns 'access_token', not 'spotify_access_token'

        localStorage.setItem("spotify_access_token", access_token);
        navigate("/"); // redirect back to App
      } catch (err) {
        console.error("Error fetching Spotify token:", err);
      }
    }

    getAccessToken();
  }, [searchParams, navigate]);

  return <div>Loading Spotify authentication...</div>;
}
