import React from "react";
import TracklistContainer from "../../containers/TracklistContainer";
import styles from './SearchResults.module.css';

function SearchResults({data, setData}) {
    return(
        <div className={styles.searchResults} >  
            <p>Search Results</p>
            <TracklistContainer data={data} setData={setData} />
        </div>
    )
}

export default SearchResults;