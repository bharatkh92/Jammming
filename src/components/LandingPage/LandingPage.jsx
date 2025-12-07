import { NavLink } from 'react-router';
import styles from './LandingPage.module.css';

export default function LandingPage({isLoggedIn, userProfile}) {
    return(
        <div className={styles.landingPage}>
            <h1>Welcome to Jamming{isLoggedIn? `, ${userProfile.username}`:``}</h1>

            <h2>This is practice project</h2>

            <p>Here you are able to</p>
            <ul>
                <li>Search Spotify Track.</li>
                <li>Add tracks to your new Playlist.</li>
                <li>Save the new Playlist to your Spotify Account.</li>
            </ul>
            
            {isLoggedIn ? (
                <p>Continue to <NavLink className={styles.navLink} to="/app">App</NavLink></p>
            ) : (
                <p><NavLink className={styles.navLink} to="/app">Login</NavLink> to Continue</p>
            )}

        </div>
    );
}