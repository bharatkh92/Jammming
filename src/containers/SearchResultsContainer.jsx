import React, { useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";
import TracklistContainer from "./TracklistContainer";

function SearchResultsContainer({data, setData}) {
    return(
        <>  
            <SearchResults data={data} setData={setData} />
        </>
    )
}

export default SearchResultsContainer;