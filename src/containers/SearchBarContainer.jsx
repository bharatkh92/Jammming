import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { spotifySearch } from "../authCodeWithPkce";

function SearchBarContainer({ setResponse }) {
  const [searchText, setSearchText] = useState("");
  async function handleSearch(event) {
    event.preventDefault();
    const response = spotifySearch(searchText);
    console.log(response);
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
