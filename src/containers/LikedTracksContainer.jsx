import { getUserLikedSongs, removeLikedSongs } from "../authCodeWithPkce";
import LikedTracks from "../components/LikedTracks/LikedTracks";

function LikedTracksContainer({likedSongs, setLikedSongs}) {
  
  async function handleRemoveLikeOnClick (id) {
    const result = await removeLikedSongs(id);
    if(result) {
      const refreshResult = await getUserLikedSongs(setLikedSongs);
    }
  };
  

  return (
    <LikedTracks
      likedSongs={likedSongs}
      setLikedSongs={setLikedSongs}
      handleRemoveLikeOnClick={handleRemoveLikeOnClick}
    />
  );
}

export default LikedTracksContainer;
