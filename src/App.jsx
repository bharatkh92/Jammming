import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg'
import './App.css';
import PlaylistContainer from './containers/PlaylistContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import SearchResultsContainer from './containers/SearchResultsContainer';
import {ResponseData, PlaylistData} from './MockData';








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