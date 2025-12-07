import { useEffect, useState } from "react";
import styles from "./App.module.css";
import PlaylistContainer from "./containers/PlaylistContainer";
import SearchBarContainer from "./containers/SearchBarContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import { useOutletContext } from "react-router";
import { getUserAuth } from "./authCodeWithPkce";
import LibraryContainer from "./containers/LibraryContainer";

function App() {
  // states to store search results and newPlaylistTracks tracks
  const [response, setResponse] = useState();
  const [newPlaylistTracks, setNewPlaylistTracks] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("Playlist");

  const { isLoggedIn, userPlaylists, userProfile } = useOutletContext();
  useEffect(() => {
    if (!isLoggedIn) {
      getUserAuth();
    }
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.searchBarContainer}>
        <SearchBarContainer setResponse={setResponse} />
      </div>
      <div className={styles.playlistSearchResultsContainer}>
        <PlaylistContainer
          newPlaylistTracks={newPlaylistTracks}
          setNewPlaylistTracks={setNewPlaylistTracks}
          newPlaylistName={newPlaylistName}
          setNewPlaylistName={setNewPlaylistName}
          setResponse={setResponse}
          userProfile={userProfile}
        />
        <SearchResultsContainer
          response={response}
          setResponse={setResponse}
          newPlaylistTracks={newPlaylistTracks}
          setNewPlaylistTracks={setNewPlaylistTracks}
        />
      </div>
      <div className={styles.libraryContainer}>
        <LibraryContainer
          userPlaylists={userPlaylists}
          setNewPlaylistTracks={setNewPlaylistTracks}
          setNewPlaylistName={setNewPlaylistName}
          
        />
      </div>
    </div>
  );
}

export default App;
