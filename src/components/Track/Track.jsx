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
    <div className={styles.track} onClick={() => handleButtonClick(id)}>
      <img
        className={styles.imageContainer}
        src={image.url}
        height={image.height}
        width={image.width}
      />
      <div className={styles.textContainer}>
        <p id={id} uri={uri}>
          {name}
        </p>
        <p>{artists.map((artist) => artist.name).join(", ")}</p>
      </div>
      <button className={styles.buttonContainer}>{buttonOperator}</button>
    </div>
  );
}

export default Track;
