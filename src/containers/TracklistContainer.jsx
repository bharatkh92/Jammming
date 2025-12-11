import Tracklist from "../components/Tracklist/Tracklist";

function TracklistContainer({
  data,
  handleButtonClick,
  buttonDisplayChar,
  handleLikeIconOnClick
}) {
  return (
    <>
      <Tracklist
        data={data}
        handleButtonClick={handleButtonClick}
        buttonDisplayChar={buttonDisplayChar}
        handleLikeIconOnClick={handleLikeIconOnClick}
      />
    </>
  );
}

export default TracklistContainer;
