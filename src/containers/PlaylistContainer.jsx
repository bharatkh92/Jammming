import React, { useState } from "react";
import Playlist from "../components/Playlist/Playlist";
import {
  addToLikedSongs,
  checkLikedSongs,
  getUserLikedSongs,
  removeUserPlaylist,
  saveUserPlaylist,
} from "../authCodeWithPkce";

function PlaylistContainer({
  newPlaylistTracks,
  userProfile,
  userPlaylists,
  setNewPlaylistTracks,
  newPlaylistNameObject,
  setNewPlaylistNameObject,
  refreshUserData,
  setLikedSongs
}) {
  const [inputToggle, setInputToggle] = useState(false);

  function handlePlaylistName(e) {
    // toggle to edit and save the newPlaylist name
    setInputToggle(false);
  }

  function handleRemoveTrack(id) {
    // filtering out and removing the songs from the newPlaylistTracks
    setNewPlaylistTracks((prev) =>
      prev.filter((trackObject) => trackObject.id != id)
    );
  }

  async function handleSaveToSpotify() {
    let trackUris = newPlaylistTracks.map((track) => track.uri);
    // checking if the playlist already exists in user playlist
    if (
      userPlaylists.find(
        (arrayElement) => arrayElement.id === newPlaylistNameObject.id
      )
    ) {
      // deleting old playlist
      const result = await removeUserPlaylist(newPlaylistNameObject.id);
    }
    const newPlaylistSaved = await saveUserPlaylist(
      userProfile.userId,
      newPlaylistNameObject.name,
      trackUris
    );
    if (newPlaylistSaved) {
      refreshUserData();
      setNewPlaylistNameObject(prevObject => ({ ...prevObject, name: 'Playlist', id: ''}));
      setNewPlaylistTracks([]);
    }
  }

  async function handleAddLikedSong(id) {
    const alreadyExists = await checkLikedSongs(id);
    if(!alreadyExists[0]){
      const addToLikedResult = await addToLikedSongs(id);
      console.log('song added');
      const refreshResult = getUserLikedSongs(setLikedSongs);
    } else {
      console.log('song already exists');
    }

  }

  return (
    <>
      <Playlist
        inputToggle={inputToggle}
        setInputToggle={setInputToggle}
        newPlaylistNameObject={newPlaylistNameObject}
        setNewPlaylistNameObject={setNewPlaylistNameObject}
        handlePlaylistName={handlePlaylistName}
        newPlaylistTracks={newPlaylistTracks}
        handleRemoveTrack={handleRemoveTrack}
        handleSaveToSpotify={handleSaveToSpotify}
        handleAddLikedSong={handleAddLikedSong}
      />
    </>
  );
}

export default PlaylistContainer;
