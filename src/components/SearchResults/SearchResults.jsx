import TracklistContainer from "../../containers/TracklistContainer";
import styles from "./SearchResults.module.css";

function SearchResults({ response, setResponse, handleAddTrack, operation }) {
  return (
    <div className={styles.searchResults}>
      <p className={styles.searchResultsTitle}>Search Results</p>
      <TracklistContainer
        data={response}
        setData={setResponse}
        handleButtonClick={handleAddTrack}
        operation={operation}
      />
    </div>
  );
}

export default SearchResults;
