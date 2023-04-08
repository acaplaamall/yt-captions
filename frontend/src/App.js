import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import YouTube from 'react-youtube';

function App () {
  const [currentRaw, setCurrentRaw] = React.useState(null);
  const [currentVideoId, setCurrentVideoId] = React.useState(null);
  const [savedRaws, setSavedRaws] = React.useState([]);
  const [url, setUrl] = React.useState('')

  async function handleSubmit () {
    const ytRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    const res = ytRegex.exec(url);
    if (res !== null) {
      setCurrentVideoId(res[3])
      await axios
        .post('http://localhost:8000/transcript/new/', {
          url: res[3],
        })
        .then((response) => {
          setCurrentRaw(response.data)
        }).then(() => {
          setUrl('')
        })
        .catch((response) => {
          alert(response.error)
        });
    } else {
      alert("Invalid video")
    }
  };

  async function handleSave () {
    await axios
      .post('http://localhost:8000/transcript/save/', {
        transcript: currentRaw,
      })
      .then(() => {
        getRaw()
      })
      .catch((response) => {
        alert(response.error)
      });

  };

  async function getRaw () {
    await axios
      .get('http://localhost:8000/transcripts/').then((response) => {
        setSavedRaws(response.data)
        console.log(savedRaws)

      })
  }

  React.useEffect(() => { }, [savedRaws])

  return (
    <div>
      <div>https://www.youtube.com/watch?v=jPluvSrEnLU</div>
      <div>Enter a Youtube link</div>
      <TextField id="outlined-basic" variant="outlined" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button variant="text" onClick={handleSubmit}>Submit</Button>
      {/*currentVideoId && <YouTube
        videoId={currentVideoId}
        opts={{
          height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        }}
        onReady={(event) => { event.target.pauseVideo() }}>
      </YouTube>*/}
      {currentRaw &&
        <div>
          <div>{currentRaw.text}</div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      }
      <div>
        Saved raw transcripts
        {savedRaws.map((item, i) => {
          return <div key={item.id}>
            <div>{item.fields.title}</div>
          </div>
        })}
      </div>
    </div >
  );
}

export default App;
