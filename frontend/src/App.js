import React from 'react';
import VideoPlayer from './VideoPlayer';
import { IconButton } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import TranscriptSearch from './TranscriptSearch'

function App () {
  const [vidMode, setVidMode] = React.useState(true);
  const [currentVideoId, setCurrentVideoId] = React.useState(null);
  const [currentRaw, setCurrentRaw] = React.useState(null);

  return (
    <div>
      <div className='header-bar'>
        <div className='header-icons'>
          <IconButton disabled={vidMode} onClick={() => { setVidMode(true) }}>
            <VideoLibraryIcon className={!vidMode ? 'icon' : 'disabled-icon'} />
          </IconButton>
          <IconButton disabled={!vidMode} onClick={() => { setVidMode(false) }}>
            <SearchIcon className={vidMode ? 'icon' : 'disabled-icon'} />
          </IconButton>
        </div>
      </div>

      <div className='main-element'>
        {vidMode ?
          <VideoPlayer currentVideoId={currentVideoId}
            setCurrentVideoId={setCurrentVideoId}
            currentRaw={currentRaw}
            setCurrentRaw={setCurrentRaw} /> :
          <TranscriptSearch currentRaw={currentRaw}
            setCurrentRaw={setCurrentRaw}
            currentVideoId={currentVideoId}
            setCurrentVideoId={setCurrentVideoId}
            setVidMode={setVidMode} />}
      </div>
    </div >
  );
}

export default App;
