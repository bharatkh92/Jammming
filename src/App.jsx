import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import PlaylistContainer from "./containers/PlaylistContainer";
import SearchBarContainer from "./containers/SearchBarContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import { useOutletContext } from "react-router";
import { fetchUserPlaylists, fetchUserProfile, getUserAuth } from "./authCodeWithPkce";
import LibraryContainer from "./containers/LibraryContainer";

function App() {
  // states to store search results and newPlaylistTracks tracks
  const [response, setResponse] = useState();
  const [newPlaylistTracks, setNewPlaylistTracks] = useState([]);
  const [newPlaylistNameObject, setNewPlaylistNameObject] = useState({name: 'playlist', id: ''});
  const { isLoggedIn, userPlaylists, setUserPlaylists, userProfile, setUserProfile } = useOutletContext();

  const refreshUserData = async () => {
    const userPlaylistResult = await fetchUserPlaylists(setUserPlaylists);
    const userProfileResult = await fetchUserProfile(setUserProfile);
  }
  
  const isGetUserAuthCalled = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !isGetUserAuthCalled.current) {
      isGetUserAuthCalled.current = true;
      getUserAuth();
    } else {
      refreshUserData();

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
          newPlaylistNameObject={newPlaylistNameObject}
          setNewPlaylistNameObject={setNewPlaylistNameObject}
          setResponse={setResponse}
          userProfile={userProfile}
          userPlaylists={userPlaylists}
          refreshUserData={refreshUserData}
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
          setNewPlaylistNameObject={setNewPlaylistNameObject}
          
        />
      </div>
    </div>
  );
}

export default App;
