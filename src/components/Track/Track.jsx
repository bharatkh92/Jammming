import React from "react";
import styles from "./Track.module.css";

function Track({
  id,
  name,
  artists,
  album,
  uri,
  image,
  handleButtonClick,
  buttonOperator,
}) {
  return (
    <div className={styles.track}>
      {/* <img src={image.url} height={image.height} width={image.width} /> */}
      <p id={id} uri={uri}>
        imagelength is {image.url} {name} by{" "}
        {artists.map((artist) => artist.name).join(", ")} : {album}
      </p>
      <button onClick={() => handleButtonClick(id, name, artists, album)}>
        {buttonOperator}
      </button>
    </div>
  );
}

export default Track;
