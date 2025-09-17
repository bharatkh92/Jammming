import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { spotifySearch } from "../authCodeWithPkce";

function SearchBarContainer({ setResponse }) {
  const [searchText, setSearchText] = useState("");
  async function handleSearch(event) {
    event.preventDefault();
    const response = await spotifySearch(searchText);
    console.log(response);
    const tracksArray = response.tracks.items.map((arrayElement) => ({
      id: arrayElement.id,
      name: arrayElement.name,
      artists: arrayElement.artists,
      album: arrayElement.album.name,
      uri: arrayElement.uri,
      image: arrayElement.album.images[2],
    }));
    tracksArray.map((element) => console.log(element.image));
    setResponse(tracksArray);
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
