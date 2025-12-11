import TracklistContainer from "../../containers/TracklistContainer";
import styles from "./SearchResults.module.css";

function SearchResults({ response, handleAddTrack, buttonDisplayChar, handleAddLikedSong}) {
  return (
    <div className={styles.searchResults}>
      <p className={styles.searchResultsTitle}>Search Results</p>
      <TracklistContainer
        data={response}
        handleButtonClick={handleAddTrack}
        buttonDisplayChar={buttonDisplayChar}
        handleLikeIconOnClick={handleAddLikedSong}
      />
    </div>
  );
}

export default SearchResults;
