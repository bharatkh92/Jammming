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
  playlistName,
  setPlaylistName,
  handlePlaylistName,
  playlist,
  setPlaylist,
  handleRemoveTrack,
  handleSaveToSpotify,
}) {
  let content;

  if (inputToggle) {
    content = (
      <form className={styles.playlistNameEdit} onSubmit={handlePlaylistName}>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
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
        <span onClick={() => setInputToggle(true)}>{playlistName}</span>
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
      {playlist.length > 0 && (
        <>
          <TracklistContainer
            data={playlist}
            setData={setPlaylist}
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
