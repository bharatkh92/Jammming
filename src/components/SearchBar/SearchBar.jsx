import React from "react";
import styles from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function SearchBar({ searchText, setSearchText, handleSearch }) {
  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        id="search"
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search"
      />
      <label
        htmlFor="search"
        className={styles.searchBarLabel}
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </label>
    </form>
  );
}

export default SearchBar;
