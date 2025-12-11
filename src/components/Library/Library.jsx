import styles from "./Library.module.css";
function Library({ userPlaylists, onPlaylistClickHandler }) {
  return (
    <div className={styles.library}>
      <p className={styles.libraryTitle}>Your PlayLists</p>
      <div className={styles.listContainer}>
        {userPlaylists &&
          userPlaylists.map((item) => (
            <div
              key={item.id}
              className={styles.playlistName}
              onClick={() => onPlaylistClickHandler(item.id, item.name)}
            >
              <p className={styles.playlist}>{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Library;