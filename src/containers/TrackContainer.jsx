import Track from "../components/Track/Track";

function TrackContainer({
  id,
  name,
  artists,
  uri,
  image,
  handleButtonClick,
  buttonDisplayChar,
  handleLikeIconOnClick
}) {
  return (
    <>
      {/* adding addition and deleting buttons */}
        <Track
          id={id}
          name={name}
          artists={artists}
          uri={uri}
          image={image}
          handleButtonClick={handleButtonClick}
          buttonDisplayChar={buttonDisplayChar}
          handleLikeIconOnClick={handleLikeIconOnClick}
        />
    </>
  );
}

export default TrackContainer;
