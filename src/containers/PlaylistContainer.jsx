import React, { useState } from "react";
import Playlist from "../components/Playlist/Playlist";
import { addTracksToPlaylist, saveUserPlaylist } from "../authCodeWithPkce";

function PlaylistContainer({
  newPlaylistTracks,
  userProfile,
  setNewPlaylistTracks,
  setResponse,
  newPlaylistName,
  setNewPlaylistName,
}) {
  const [inputToggle, setInputToggle] = useState(false);

  function handlePlaylistName(e) {
    // toggle to edit and save the newPlaylist name
    setInputToggle(false);
  }

  function handleRemoveTrack(id) {
    // filtering out and removing the songs from the newPlaylistTracks
    setNewPlaylistTracks((prev) => prev.filter((trackObject) => trackObject.id != id));
  }

  async function handleSaveToSpotify() {
    const { success, playlistId } = await saveUserPlaylist(
      userProfile.userId,
      newPlaylistName
    );
    if (success) {
      let trackUris = newPlaylistTracks.map((track) => track.uri);
      const result = await addTracksToPlaylist(trackUris, playlistId);
    }
  }

  return (
    <>
      <Playlist
        inputToggle={inputToggle}
        setInputToggle={setInputToggle}
        newPlaylistName={newPlaylistName}
        setNewPlaylistName={setNewPlaylistName}
        handlePlaylistName={handlePlaylistName}
        newPlaylistTracks={newPlaylistTracks}
        setNewPlaylistTracks={setNewPlaylistTracks}
        handleRemoveTrack={handleRemoveTrack}
        handleSaveToSpotify={handleSaveToSpotify}
      />
    </>
  );
}

export default PlaylistContainer;
