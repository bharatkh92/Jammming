import React, { useState } from "react";
import Playlist from "../components/Playlist/Playlist";

function PlaylistContainer({ playlist, setPlaylist }) {
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [inputToggle, setInputToggle] = useState(false);

  function handlePlaylistName(e) {
    setInputToggle(false);
  }

  function handleRemoveTrack(id) {
    setPlaylist((prev) =>
      prev.filter((trackObject) => trackObject.track != id)
    );
  }

  function handleSaveToSpotify() {
    // let uriArray = [];
    // playlist.map(trackObject => uriArray.push(trackObject.uri));
    // alert(uriArray);
  }

  return (
    <>
      <Playlist
        inputToggle={inputToggle}
        setInputToggle={setInputToggle}
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        handlePlaylistName={handlePlaylistName}
        playlist={playlist}
        setPlaylist={setPlaylist}
        handleRemoveTrack={handleRemoveTrack}
        handleSaveToSpotify={handleSaveToSpotify}
      />
    </>
  );
}

export default PlaylistContainer;
