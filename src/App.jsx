import { useEffect, useState } from "react";
import "./App.css";
import PlaylistContainer from "./containers/PlaylistContainer";
import SearchBarContainer from "./containers/SearchBarContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import { redirectToAuthCodeFlow } from "./authCodeWithPkce";

const clientId = "66658c358a2d4036983a5e036dad9f41";
const redirectURI = "https://codecademyjammingbharatkh92.netlify.app/callback";

function App() {
  // states to store search results and playlist tracks
  const [response, setResponse] = useState();
  const [playlist, setPlaylist] = useState([]);

  // using useEffect after rendering to check access token
  useEffect(() => {
    let spotify_access_token = localStorage.getItem("spotify_access_token");
    // redirecting to authorization to get access token
    if (!spotify_access_token) {
      redirectToAuthCodeFlow(clientId, redirectURI);
      console.log(spotify_access_token);
    }
  }, []);

  return (
    <div className="app">
      <div className="searchBarContainer">
        <SearchBarContainer setResponse={setResponse} />
      </div>
      <div className="playlistSearchResultsContainer">
        <PlaylistContainer
          playlist={playlist}
          setPlaylist={setPlaylist}
          setResponse={setResponse}
        />
        <SearchResultsContainer
          response={response}
          setResponse={setResponse}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </div>
    </div>
  );
}

export default App;
