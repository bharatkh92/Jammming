import React from "react";
import styles from "./Track.module.css";

function Track({
  id,
  name,
  artists,
  album,
  uri,
  handleButtonClick,
  buttonOperator,
}) {
  return (
    <div className={styles.track}>
      <p id={id} uri={uri}>
        {name} by {artists.map((artist) => artist)} : {album}
      </p>
      <button onClick={() => handleButtonClick(id, name, artists, album)}>
        {buttonOperator}
      </button>
    </div>
  );
}

export default Track;
