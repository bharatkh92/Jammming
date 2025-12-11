import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Track.module.css";

function Track({
  id,
  name,
  artists,
  uri,
  image,
  handleButtonClick,
  buttonDisplayChar,
  handleLikeIconOnClick,
}) {
  return (
    <div className={styles.track}>
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
      <FontAwesomeIcon
        className={styles.icon}
        onClick={() => handleLikeIconOnClick(id)}
        icon="fa-solid fa-thumbs-up"
      />
      {handleButtonClick && buttonDisplayChar ? (
        <div
          className={styles.buttonContainer}
          onClick={() => handleButtonClick(id)}
        >
          {buttonDisplayChar}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Track;
