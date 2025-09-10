import React from "react";
import TrackContainer from "../../containers/TrackContainer";
import styles from './Tracklist.module.css';

function Tracklist({data, setData, handleButtonClick, operation}){
    return(
        <div className={styles.tracklist}>
            {   
                data && data.map((trackObject, index) => (
                <TrackContainer 
                    id={trackObject.id}
                    track={trackObject.track}
                    artist={trackObject.artist} 
                    album={trackObject.album} 
                    key={index} 
                    handleButtonClick={handleButtonClick} 
                    operation={operation} 
                />
            ))
        }
        </div>
    )
}

export default Tracklist;