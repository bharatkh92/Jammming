import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
      <button className={styles.buttonContainer} onClick={() => handleButtonClick(id)} >{buttonOperator}</button>
    </div>
  );
}

export default Track;
