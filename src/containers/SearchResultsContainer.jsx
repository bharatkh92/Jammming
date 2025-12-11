import { addToLikedSongs, checkLikedSongs, getUserLikedSongs } from "../authCodeWithPkce";
import SearchResults from "../components/SearchResults/SearchResults";

function SearchResultsContainer({
  response,
  newPlaylistTracks,
  setNewPlaylistTracks,
  setLikedSongs
}) {
  function handleAddTrack(id) {
    if (!newPlaylistTracks.find((track) => track.id === id)) {
      let trackObject = response.find((track) => track.id === id);
      setNewPlaylistTracks((prev) => [...prev, trackObject]);
    }
  }

  async function handleAddLikedSong(id) {
    const alreadyExists = await checkLikedSongs(id);
    if (!alreadyExists[0]) {
      const addToLikedResult = await addToLikedSongs(id);
      console.log('song added');
      const refreshResult = getUserLikedSongs(setLikedSongs);
    } else {
      console.log("song already exists");
    }
  }

  return (
    <>
      <SearchResults
        response={response}
        handleAddTrack={handleAddTrack}
        buttonDisplayChar={"+"}
        handleAddLikedSong={handleAddLikedSong}
      />
    </>
  );
}

export default SearchResultsContainer;
