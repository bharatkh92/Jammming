import SearchResults from "../components/SearchResults/SearchResults";

function SearchResultsContainer({
  response,
  setResponse,
  newPlaylistTracks,
  setNewPlaylistTracks,
}) {
  // using same Tracklist component for both searchresults and playlist operation is add or remove track
  const operation = "addTrack";
  function handleAddTrack(id) {
    if (!newPlaylistTracks.find((track) => track.id === id)) {
      let trackObject = response.find((track) => track.id === id);
      setNewPlaylistTracks((prev) => [...prev, trackObject]);
    }
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
