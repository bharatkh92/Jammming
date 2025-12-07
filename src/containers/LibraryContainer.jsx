import { fetchPlayListTracks } from "../authCodeWithPkce";
import Library from "../components/Library/Library";

export default function LibraryContainer({
  userPlaylists,
  setNewPlaylistTracks,
  setNewPlaylistName,
}) {
  const onPlaylistClickHandler = async (playlistId, playlistName) => {
    const result = await fetchPlayListTracks(playlistId);
    const tracksArray = result.map(object => ({
        id: object.track.id,
        name: object.track.name,
        artists: object.track.artists,
        uri: object.track.uri,
        image: object.track.album.images[2],
    }) )
    setNewPlaylistTracks(tracksArray);
    setNewPlaylistName(playlistName);
  };
  return (
    <Library
      userPlaylists={userPlaylists}
      onPlaylistClickHandler={onPlaylistClickHandler}
    />
  );
}
