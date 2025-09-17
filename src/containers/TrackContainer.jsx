import React from "react";
import Track from "../components/Track/Track";

function TrackContainer({id, name, artists, album, uri, handleButtonClick, operation}) {
    return(
        <>
            {   operation === 'addTrack'
                 ? 
                (<Track id={id} name={name} artists={artists} album={album} uri={uri} handleButtonClick={handleButtonClick} buttonOperator={'+'}/> )
                :
                (<Track id={id} name={name} artists={artists} album={album} uri={uri} handleButtonClick={handleButtonClick} buttonOperator={'-'}/> )

            }
        </>
    )
}

export default TrackContainer;