import TrackContainer from "../../containers/TrackContainer";
import styles from "./Tracklist.module.css";

function Tracklist({ data, setData, handleButtonClick, operation }) {
  return (
    <div className={styles.tracklist}>
      {data &&
        data.map((trackObject, index) => (
          <TrackContainer
            id={trackObject.id}
            name={trackObject.name}
            artists={trackObject.artists}
            uri={trackObject.uri}
            image={trackObject.album.images[2] || `https://picsum.photos/64/64`}
            key={trackObject.id}
            handleButtonClick={handleButtonClick}
            operation={operation}
          />
        ))}
    </div>
  );
}

export default Tracklist;
