import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg'
import './App.css';
import PlaylistContainer from './containers/PlaylistContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import SearchResultsContainer from './containers/SearchResultsContainer';
import {ResponseData, PlaylistData} from './MockData';


import { redirectToAuthCodeFlow, getAccessToken, getProfile } from './authCodeWithPkce';



const clientId = "66658c358a2d4036983a5e036dad9f41";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");



if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    localStorage.setItem("accessToken", accessToken);
    window.location.replace('https://codecademyjammingbharatkh92.netlify.app/');

    // const profile = await getProfile(accessToken);
    // populateUI(profile);
}






function App() {
  const [response, setResponse] = useState(ResponseData);
  const [playlist, setPlaylist] = useState(PlaylistData);

  return (
    <div className='app'>
      <div className='searchBarContainer'>
      <SearchBarContainer />
      </div>
      <div className='playlistSearchResultsContainer'>
        <PlaylistContainer playlist={playlist} setPlaylist={setPlaylist} />
        <SearchResultsContainer response={response} setResponse={setResponse} playlist={playlist} setPlaylist={setPlaylist} />
      </div>
      
    </div>
  )
}

export default App