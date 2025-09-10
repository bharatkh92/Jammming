import React from "react";
import Track from "../components/Track/Track";

function TrackContainer({id, track, artist, album, handleButtonClick, operation}) {
    return(
        <>
            {   operation === 'addTrack'
                 ? 
                (<Track id={id} track={track} artist={artist} album={album} handleButtonClick={handleButtonClick} buttonOperator={'+'}/> )
                :
                (<Track id={id} track={track} artist={artist} album={album} handleButtonClick={handleButtonClick} buttonOperator={'-'}/> )

            }
        </>
    )
}

export default TrackContainer;