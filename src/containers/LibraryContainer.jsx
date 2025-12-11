import { fetchPlaylistTracks } from "../authCodeWithPkce";
import Library from "../components/Library/Library";

function LibraryContainer({
  userPlaylists,
  setNewPlaylistTracks,
  setNewPlaylistNameObject,
}) {
  const onPlaylistClickHandler = async (playlistId, playlistName) => {
    const result = await fetchPlaylistTracks(playlistId);
    const tracksArray = result.map(object => object.track );
    setNewPlaylistTracks(tracksArray);
    setNewPlaylistNameObject({name: playlistName, 
      id: playlistId
    });
  };
  return (
    <Library
      userPlaylists={userPlaylists}
      onPlaylistClickHandler={onPlaylistClickHandler}
    />
  );
}

export default LibraryContainer;