import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import PlaylistContainer from "./containers/PlaylistContainer";
import SearchBarContainer from "./containers/SearchBarContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import { useOutletContext } from "react-router";
import {
  fetchUserPlaylists,
  fetchUserProfile,
  getUserAuth,
  getUserLikedSongs,
} from "./authCodeWithPkce";
import LibraryContainer from "./containers/LibraryContainer";
import LikedTracksContainer from "./containers/LikedTracksContainer";

function App() {
  // states to store search results and newPlaylistTracks tracks
  const [response, setResponse] = useState();
  const [newPlaylistTracks, setNewPlaylistTracks] = useState([]);
  const [newPlaylistNameObject, setNewPlaylistNameObject] = useState({
    name: "Playlist",
    id: "",
  });
  const {
    isLoggedIn,
    userPlaylists,
    setUserPlaylists,
    userProfile,
    setUserProfile,
    likedSongs,
    setLikedSongs,
  } = useOutletContext();

  const refreshUserData = async () => {
    const userPlaylistResult = await fetchUserPlaylists(setUserPlaylists);
    const userProfileResult = await fetchUserProfile(setUserProfile);
    const likedSongsResult = await getUserLikedSongs(setLikedSongs);
  };

  const isGetUserAuthCalled = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !isGetUserAuthCalled.current) {
      isGetUserAuthCalled.current = true;
      getUserAuth();
    } else if (!isGetUserAuthCalled.current) {
      isGetUserAuthCalled.current = true;
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
          userProfile={userProfile}
          userPlaylists={userPlaylists}
          refreshUserData={refreshUserData}
          setLikedSongs={setLikedSongs}
        />
        <SearchResultsContainer
          response={response}
          newPlaylistTracks={newPlaylistTracks}
          setNewPlaylistTracks={setNewPlaylistTracks}
          setLikedSongs={setLikedSongs}
        />
      </div>
      <div className={styles.widthDivider}>
        <LibraryContainer
          userPlaylists={userPlaylists}
          setNewPlaylistTracks={setNewPlaylistTracks}
          setNewPlaylistNameObject={setNewPlaylistNameObject}
        />
        <LikedTracksContainer
          likedSongs={likedSongs}
          setLikedSongs={setLikedSongs}
        />
      </div>
    </div>
  );
}

export default App;
