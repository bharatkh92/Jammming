import React from "react";
import Playlist from "../components/Playlist/Playlist";

function PlaylistContainer({data, setData}) {
    return(
        <>
        <Playlist data={data} setData={setData} />
        </>
    );
}

export default PlaylistContainer;