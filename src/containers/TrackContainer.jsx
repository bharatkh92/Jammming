import Track from "../components/Track/Track";

function TrackContainer({
  id,
  name,
  artists,
  uri,
  image,
  handleButtonClick,
  operation,
}) {
  return (
    <>
      {/* adding addition and deleting buttons */}
      {operation === "addTrack" ? (
        <Track
          id={id}
          name={name}
          artists={artists}
          uri={uri}
          image={image}
          handleButtonClick={handleButtonClick}
          buttonOperator={"+"}
        />
      ) : (
        <Track
          id={id}
          name={name}
          artists={artists}
          uri={uri}
          image={image}
          handleButtonClick={handleButtonClick}
          buttonOperator={"-"}
        />
      )}
    </>
  );
}

export default TrackContainer;
