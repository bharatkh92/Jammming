import React from "react";
import styles from './Track.module.css';

function Track({id, track, artist, album, handleButtonClick, buttonOperator}) {
    return(
        
        <div className={styles.track}>
            <p id={id}>{track} by {artist} : {album}</p>
            <button onClick={()=> handleButtonClick(id, track, artist, album)}>{buttonOperator}</button>
        </div>
    )
}

export default Track;