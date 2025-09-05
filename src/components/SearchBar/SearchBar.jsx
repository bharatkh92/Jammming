import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import styles from './SearchBar.module.css';

function SearchBar() {
    return(
        <div className={styles.searchBar}>
            <input type="text" id="search" name="search" />
            <label htmlFor="search">Search</label>
        </div>
    )
}

export default SearchBar;