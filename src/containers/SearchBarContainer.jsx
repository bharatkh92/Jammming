import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { spotifySearch } from "../authCodeWithPkce";

function SearchBarContainer({ setResponse }) {
  const [searchText, setSearchText] = useState("");
  async function handleSearch(event) {
    // prevent page from reloading
    event.preventDefault();
    // fetch search results from spotify
    const response = await spotifySearch(searchText);
    // adding results to the searchResults container
    const tracksArray = response.tracks.items.map((arrayElement) => ({
      id: arrayElement.id,
      name: arrayElement.name,
      artists: arrayElement.artists,
      uri: arrayElement.uri,
      image: arrayElement.album.images[2],
    }));
    setResponse(tracksArray);
    setSearchText("");
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
