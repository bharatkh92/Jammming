import TracklistContainer from '../../containers/TracklistContainer';
import styles from './LikedTracks.module.css';
function LikedTracks ({likedSongs, handleRemoveLikeOnClick}) {
    return (
        <div className={styles.container} >
            <p className={styles.title} >Liked Songs</p>
            <TracklistContainer 
                data={likedSongs}
                // handleButtonClick={''}
                handleLikeIconOnClick={handleRemoveLikeOnClick}
            />
        </div>
    );
}

export default LikedTracks;