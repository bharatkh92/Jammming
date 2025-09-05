import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg'
import './App.css';
import PlaylistContainer from './containers/PlaylistContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import SearchResultsContainer from './containers/SearchResultsContainer';
import ResponseData from './MockData';


function App() {
  const [Response, setResponse] = useState(ResponseData);

  return (
    <div className='app'>
      <div className='searchBarContainer'>
      <SearchBarContainer />
      </div>
      <div className='playlistSearchResultsContainer'>
        <PlaylistContainer data={Response} setData={setResponse} />
        <SearchResultsContainer data={Response} setData={setResponse} />
      </div>
      
    </div>
  )
}

export default App