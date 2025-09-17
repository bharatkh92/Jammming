import React, { useState } from "react";
import Playlist from "../components/Playlist/Playlist";

function PlaylistContainer({ playlist, setPlaylist, setResponse }) {
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [inputToggle, setInputToggle] = useState(false);

  function handlePlaylistName(e) {
    // toggle to edit and save the playlist name
    setInputToggle(false);
  }

  function handleRemoveTrack(id) {
    // filtering out and removing the songs from the playlist
    setPlaylist((prev) => prev.filter((trackObject) => trackObject.id != id));
  }

  async function handleSaveToSpotify() {
    // Getting user ID for create playlist request
    const url = "https://api.spotify.com/v1/me";
    const spotify_access_token = localStorage.getItem("spotify_access_token");
    const payload = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotify_access_token}`,
      },
    };
    // payload for creating a new playlist
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
    // extracting uri from the playlist to send the request
    const uriArray = playlist.map((track) => track.uri);
    // payload for adding tracks to a newly created playlist
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
      // fetching spotify user ID
      const response = await fetch(url, payload);
      if (!response.ok) {
        console.log(`error ${response.status}`);
      }
      const result = await response.json();
      const spotifyUserId = result.id;

      // creating new playlist
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`;
      const playlistResponse = await fetch(createPlaylistUrl, playlistPayload);
      if (!playlistResponse.ok) {
        console.log(`error ${playlistResponse.status}`);
      }
      const playlistResult = await playlistResponse.json();
      const playlistId = playlistResult.id;

      //adding tracks to the new playlist
      const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
      const addTracksResponse = await fetch(addTracksUrl, addTracksPayload);
      if (!addTracksResponse.ok) {
        console.log(`adding tracks failed ${addTracksResponse.status}`);
      }
      const addTracksResult = await addTracksResponse.json();
      alert(`${playlistName} successfuly created`);
      setPlaylistName("Playlist");
      setPlaylist([]);
      setResponse();
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
