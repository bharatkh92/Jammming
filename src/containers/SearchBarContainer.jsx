import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";

function SearchBarContainer({ setResponse }) {
  const [searchText, setSearchText] = useState("");
  async function handleSearch() {
    preventDefault();
    const spotify_access_token = localStorage.getItem("spotify_access_token");
    console.log(spotify_access_token);
    const searchTextURI = encodeURIComponent(searchText);
    const url = `https://api.spotify.com/v1/search?q=${searchTextURI}&type=track`;
    const payload = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotify_access_token}`,
      },
    };
    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        console.log("error response not ok");
      }
      const results = await response.json();
      console.log(`search results ${results}`);
      const tracksObject = results.tracks.items.map((trackObject) => ({
        trackName: trackObject.name,
        artists: trackObject.artists,
        uri: trackObject.uri,
      }));
      console.log(`tracksObject ${tracksObject}`);

      setResponse(tracksObject);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default SearchBarContainer;
