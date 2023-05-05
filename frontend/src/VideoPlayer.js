import React from 'react';
import Button from '@mui/material/Button';
import axios from "axios";
import YouTube from 'react-youtube';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import { Tooltip } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Search from './Search';
import ExportPopup from './ExportPopup';

function VideoPlayer ({ currentVideoId, setCurrentVideoId, currentRaw, setCurrentRaw }) {
    const [savedRaws, setSavedRaws] = React.useState([]);
    const [backdrop, setBackdrop] = React.useState(false)
    const [urlTextfield, setUrlTextfield] = React.useState('')
    const [exportOpen, setExportOpen] = React.useState(false)

    async function handleLinkSubmit () {
        const ytRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        const res = ytRegex.exec(urlTextfield);
        if (res !== null) {
            fetchTranscript(res[3])
        } else {
            alert("Invalid video")
        }
    }

    async function fetchTranscript (url) {
        setBackdrop(true)
        await axios
            .post('http://localhost:8000/transcript/new/', {
                url: url,
            })
            .then((response) => {
                setCurrentRaw(response.data)
            }).then(() => {
                setCurrentVideoId(url)
            }).then(() => {
                setBackdrop(false)
            })
            .catch((response) => {
                setBackdrop(false)
                alert(response.error)
            });
    }


    async function handleSave () {
        await axios
            .post('http://localhost:8000/transcript/save/', {
                url: currentVideoId,
            })
            .then(() => {
                getRaws()
            })
            .catch((response) => {
                alert(response.error)
            });

    };

    async function getRaws () {
        await axios
            .get('http://localhost:8000/transcripts/').then((response) => {
                setSavedRaws(response.data)
            })
    }

    async function handleDelete (id) {
        await axios.delete('http://localhost:8000/transcripts/delete/' + id, {}).then(() => {
            getRaws()
        })
            .catch((response) => {
                alert(response.error)
            });
    }

    React.useEffect(() => { }, [savedRaws])
    React.useEffect(() => {
        currentRaw == null && currentVideoId != null && fetchTranscript(currentVideoId);
        getRaws()
    }, [])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
                onClick={() => { setBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ExportPopup isOpen={exportOpen} setOpen={setExportOpen} currentRaw={currentRaw}></ExportPopup>
            <Search title={"Caption Transcriber"} input={urlTextfield} placeholder={"Paste a YouTube link"} setInput={setUrlTextfield} handleSubmit={handleLinkSubmit}></Search>
            {
                currentRaw &&
                <div className='video-display'>
                    <YouTube
                        videoId={currentVideoId}
                        opts={{
                            height: '390',
                            width: '640',
                            playerVars: {
                                // https://developers.google.com/youtube/player_parameters
                                autoplay: 0,
                            },
                        }}
                        onReady={(event) => { event.target.pauseVideo() }}>
                    </YouTube>
                    <div className='caption-sidebar'>
                        <div className='caption-text'>
                            {currentRaw.text.map((line) => {
                                return <div>{line}</div>
                            })}
                        </div>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={() => { setExportOpen(true) }}>Export</Button>
                    </div>
                </div>
            }
            <div className='saved-transcripts'>
                <h3> Saved transcripts</h3>
                {savedRaws.map((item) => {
                    return <div key={item.pk}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>{item.fields.title}</Typography>
                            <Box>
                                <Tooltip title={item.fields.vidId === currentVideoId ? "Video is already playing" : "Play"}>
                                    <span>
                                        <IconButton disabled={item.fields.vidId === currentVideoId} onClick={() => { fetchTranscript(item.fields.vidId) }}>
                                            <PlayCircleFilled />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => { handleDelete(item.pk) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </div>
                })}
            </div>
            <div>https://www.youtube.com/watch?v=jPluvSrEnLU</div>
            <div>https://www.youtube.com/watch?v=z6GkLxyIO3o</div>

        </div >
    );
}

export default VideoPlayer;
