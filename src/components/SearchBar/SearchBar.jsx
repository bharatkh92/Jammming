import React from "react";
import styles from './SearchBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function SearchBar() {
    return(
        <div className={styles.searchBar}>
            <input type="text" id="search" name="search" placeholder="search" />
            <label htmlFor="search" className={styles.searchBarLabel} >
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </label>
        </div>
    )
}

export default SearchBar;