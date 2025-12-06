import { useEffect, useState } from "react";
import "./App.css";
import PlaylistContainer from "./containers/PlaylistContainer";
import SearchBarContainer from "./containers/SearchBarContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import { useOutletContext } from "react-router";
import { getUserAuth } from "./authCodeWithPkce";

function App() {
  // states to store search results and playlist tracks
  const [response, setResponse] = useState();
  const [playlist, setPlaylist] = useState([]);
  const { isLoggedIn } =
    useOutletContext();
  useEffect(() => {
    if (!isLoggedIn) {
      getUserAuth();
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
