import React from "react";
import Track from "../components/Track/Track";

function TrackContainer({key, track, artist, album}) {
    return(
        <>
        <Track key={key} track={track} artist={artist} album={album} />
        </>
    )
}

export default TrackContainer;