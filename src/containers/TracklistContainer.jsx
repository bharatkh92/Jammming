import React from "react";
import Tracklist from "../components/Tracklist/Tracklist";
import TrackContainer from "./TrackContainer";

function TracklistContainer({data, setData}) {
    return(
        <>
        <Tracklist data={data} setData={setData} />
        </>
    )
}

export default TracklistContainer;