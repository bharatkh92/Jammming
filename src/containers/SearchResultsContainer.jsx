import SearchResults from "../components/SearchResults/SearchResults";

function SearchResultsContainer({
  response,
  setResponse,
  playlist,
  setPlaylist,
}) {
  // using same Tracklist component for both searchresults and playlist operation is add or remove track
  const operation = "addTrack";
  function handleAddTrack(id) {
    if (!playlist.find((track) => track.id === id)) {
      let trackObject = response.find((track) => track.id === id);
      setPlaylist((prev) => [...prev, trackObject]);
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
