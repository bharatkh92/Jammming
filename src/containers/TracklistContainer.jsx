import React from "react";
import Tracklist from "../components/Tracklist/Tracklist";
import TrackContainer from "./TrackContainer";

function TracklistContainer({data, setData, handleButtonClick, operation}) {
    return(
        <>
        <Tracklist data={data} setData={setData} handleButtonClick={handleButtonClick} operation={operation} />
        </>
    )
}

export default TracklistContainer;