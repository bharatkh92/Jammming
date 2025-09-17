import React from "react";
import styles from "./Track.module.css";

function Track({
  id,
  name,
  artists,
  uri,
  image,
  handleButtonClick,
  buttonOperator,
}) {
  return (
    <div className={styles.track}>
      <img src={image.url} height={image.height} width={image.width} />
      <p id={id} uri={uri}>
        {name} by {artists.map((artist) => artist.name).join(", ")}
      </p>
      <button onClick={() => handleButtonClick(id)}>{buttonOperator}</button>
    </div>
  );
}

export default Track;
