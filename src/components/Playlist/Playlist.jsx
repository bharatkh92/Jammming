import TracklistContainer from "../../containers/TracklistContainer";
import styles from "./Playlist.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function Playlist({
  inputToggle,
  setInputToggle,
  newPlaylistName,
  setNewPlaylistName,
  handlePlaylistName,
  newPlaylistTracks,
  setNewPlaylistTracks,
  handleRemoveTrack,
  handleSaveToSpotify,
}) {
  let content;

  if (inputToggle) {
    content = (
      <form className={styles.playlistNameEdit} onSubmit={handlePlaylistName}>
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          autoFocus
        />
        <FontAwesomeIcon
          className={styles.fontAwsomeIcon}
          icon="fa-solid fa-check"
          onClick={handlePlaylistName}
        />
      </form>
    );
  } else {
    content = (
      <div className={styles.playlistNameDisplay}>
        <span onClick={() => setInputToggle(true)}>{newPlaylistName}</span>
        <FontAwesomeIcon
          className={styles.fontAwsomeIcon}
          icon="fa-solid fa-pen"
          onClick={() => setInputToggle(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.playlist}>
      {content}
      {newPlaylistTracks.length > 0 && (
        <>
          <TracklistContainer
            data={newPlaylistTracks}
            setData={setNewPlaylistTracks}
            handleButtonClick={handleRemoveTrack}
          />
          <button className={styles.button} onClick={handleSaveToSpotify}>
            Save To Spotify
          </button>
        </>
      )}
    </div>
  );
}

export default Playlist;
