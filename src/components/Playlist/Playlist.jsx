import React from 'react';
import TracklistContainer from '../../containers/TracklistContainer';
import styles from './Playlist.module.css';

function Playlist({data, setData}) {
    return (
        <div className={styles.playlist}>
            <p>Playlist</p>
            { data && (
                <>
                <TracklistContainer data={data} setData={setData} /> 
                <button className={styles.button}>Save To Spotify</button>
                </>
            ) }
        </div>
    );
}

export default Playlist;