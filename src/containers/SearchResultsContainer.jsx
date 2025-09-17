import React, { useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";

function SearchResultsContainer({
  response,
  setResponse,
  playlist,
  setPlaylist,
}) {
  const operation = "addTrack";
  function handleAddTrack(id, track, artist, album) {
    // alert(`track ${track} artist ${artist} album${album}`)
    // if (!playlist.find((trackObject) => trackObject.track === track)) {
    //   setPlaylist((prev) => [...prev, { track, artist, album, id }]);
    // }
  }
  return (
    <>
      <SearchResults
        response={response}
        setResponse={setResponse}
        handleAddTrack={handleAddTrack}
        operation={operation}
      />
    </>
  );
}

export default SearchResultsContainer;
