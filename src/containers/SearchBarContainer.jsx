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
    setResponse(response);
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
