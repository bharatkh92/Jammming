import React, { useState } from "react";
import Playlist from "../components/Playlist/Playlist";

function PlaylistContainer({ playlist, setPlaylist }) {
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [inputToggle, setInputToggle] = useState(false);

  function handlePlaylistName(e) {
    setInputToggle(false);
  }

  function handleRemoveTrack(id) {
    setPlaylist((prev) => prev.filter((trackObject) => trackObject.id != id));
  }

  async function handleSaveToSpotify() {
    const url = "https://api.spotify.com/v1/me";
    const spotify_access_token = localStorage.getItem("spotify_access_token");
    const payload = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotify_access_token}`,
      },
    };
    const createPlaylistUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`;
    const playlistPayload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotify_access_token}`,
      },
      body: JSON.stringify({
        name: playlistName,
        description: "",
        public: false,
      }),
    };
    const uriArray = playlist.map((track) => track.uri);
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const addTracksPayload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotify_access_token}`,
      },
      body: JSON.stringify({
        uris: uriArray,
        position: 0,
      }),
    };

    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        console.log(`error ${response.status}`);
      }
      const result = await response.json();
      const spotifyUserId = result.id;
      console.log(`userid received ${spotifyUserId}`);

      const playlistResponse = await fetch(createPlaylistUrl, playlistPayload);
      if (!playlistResponse.ok) {
        console.log(`error ${playlistResponse.status}`);
      }
      const playlistResult = await playlistResponse.json();
      const playlistId = playlistResult.id;
      console.log(`playlist created ${playlistId}`);

      const addTracksResponse = await fetch(addTracksUrl, addTracksPayload);
      if (!addTracksResponse.ok) {
        console.log(`adding tracks failed ${addTracksResponse.status}`);
      }
      const addTracksResult = await addTracksResponse.json();
      alert(addTracksResult);
    } catch (e) {
      console.log(e);
    }
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
