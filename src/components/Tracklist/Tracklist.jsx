import TrackContainer from "../../containers/TrackContainer";
import styles from "./Tracklist.module.css";

function Tracklist({ data, handleButtonClick, buttonDisplayChar, handleLikeIconOnClick }) {
  return (
    <div className={styles.tracklist}>
      {data &&
        data.map((trackObject) => (
          <TrackContainer
            id={trackObject.id}
            name={trackObject.name}
            artists={trackObject.artists}
            uri={trackObject.uri}
            image={trackObject.album.images[2]  || `https://picsum.photos/64/64`}
            key={trackObject.id}
            handleButtonClick={handleButtonClick}
            buttonDisplayChar={buttonDisplayChar}
            handleLikeIconOnClick={handleLikeIconOnClick}
          />
        ))}
    </div>
  );
}

export default Tracklist;
