import { useState } from 'react';
import './App.css';
import PlaylistContainer from './containers/PlaylistContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import SearchResultsContainer from './containers/SearchResultsContainer';
import {ResponseData, PlaylistData} from './MockData';
import { redirectToAuthCodeFlow } from './authCodeWithPkce';

const clientId = "66658c358a2d4036983a5e036dad9f41";
const redirectURI = "https://codecademyjammingbharatkh92.netlify.app/callback";
let spotify_access_token = localStorage.getItem('spotify_access_token');

if(!spotify_access_token) {
    redirectToAuthCodeFlow(clientId, redirectURI);
} else {
  console.log("token is successfully stored")
}


function App() {
  const [response, setResponse] = useState();
  const [playlist, setPlaylist] = useState(PlaylistData);

  return (
    <div className='app'>
      <div className='searchBarContainer'>
      <SearchBarContainer setResponse={setResponse} />
      </div>
      <div className='playlistSearchResultsContainer'>
        <PlaylistContainer playlist={playlist} setPlaylist={setPlaylist} />
        <SearchResultsContainer response={response} setResponse={setResponse} playlist={playlist} setPlaylist={setPlaylist} />
      </div>
      
    </div>
  )
}

export default App