import React from "react";
import styles from './Track.module.css';

function Track({key, track, artist, album}) {
    return(
        <div className={styles.track}>
            <p>{track}</p>
            <p>{artist}</p>
            <p>{album}</p>
        </div>
    )
}

export default Track;