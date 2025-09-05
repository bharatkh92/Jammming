import React from "react";
import TrackContainer from "../../containers/TrackContainer";
import styles from './Tracklist.module.css';

function Tracklist({data, setData}){
    return(
        <div className={styles.tracklist}>
            {
                data && data.map((trackObject) => (
                <TrackContainer track={trackObject.track} artist={trackObject.artist} album={trackObject.album} />
            ))
        }
        </div>
    )
}

export default Tracklist;