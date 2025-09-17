import React, { useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";

function SearchResultsContainer({
  response,
  setResponse,
  playlist,
  setPlaylist,
}) {
  const operation = "addTrack";
  function handleAddTrack(id, track, artists, uri, image) {
    alert(`track ${name} artist ${artists.map((artist) => artist).join(", ")}`);
    if (!playlist.find((track) => track.id === id)) {
      let trackObject = response.find((track) => track.id === id);
      setPlaylist((prev) => [...prev, trackObject]);
    }

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
