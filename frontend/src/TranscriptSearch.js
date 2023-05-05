import React from "react"
import Search from "./Search"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';

function TranscriptSearch ({ currentRaw, setCurrentRaw, currentVideoId, setCurrentVideoId, setVidMode }) {
    const [keyword, setKeyword] = React.useState('')
    const [searchedKeyword, setSearchedKeyword] = React.useState('')
    const [backdrop, setBackdrop] = React.useState(false)
    const [savedRaws, setSavedRaws] = React.useState([]);
    const [timestamps, setTimestamps] = React.useState([]);

    async function handleSubmit () {
        if (keyword != '') {
            setBackdrop(true)
            setSearchedKeyword(keyword)
            await searchRaw()
            await axios
                .get('http://localhost:8000/transcripts/search/' + keyword).then((response) => {
                    setSavedRaws(response.data)
                }).then(() => {
                    setBackdrop(false)
                })
                .catch((response) => {
                    setBackdrop(false)
                    alert(response.error)
                });
        }
    }



    async function searchRaw () {
        if (currentRaw == null) {
            return;
        }
        var newTimestamps = []

        currentRaw.text.map((item) => {
            const patternSize = keyword.length;
            const textSize = item.length;
            var i = 0, j = 0;
            while ((i + patternSize) <= textSize) {
                j = patternSize - 1;
                while (item[i + j].toLowerCase() == keyword[j].toLowerCase()) {
                    j--;
                    if (j < 0) {
                        newTimestamps.push(item);
                        return;
                    }
                }
                i++;
            }
            return;
        })
        setTimestamps(newTimestamps);
    }

    async function fetchTranscript (url) {
        setBackdrop(true)
        await axios
            .post('http://localhost:8000/transcript/new/', {
                url: url,
            }).then((response) => {
                setCurrentRaw(response.data)
            }).then(() => {
                setBackdrop(false)
            })
    }

    React.useEffect(() => {
        searchRaw();
    }, [currentRaw])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
                onClick={() => { setBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div>
                <Search title={"Search Saved Transcripts"} input={keyword} setInput={setKeyword} placeholder={"Enter a search keyword"} handleSubmit={handleSubmit}></Search>
                {timestamps.length > 0 && <div>
                    <h3> Current video timestamps </h3>
                    {timestamps.map((item) => {
                        return (<div>{item}...</div>)
                    })}
                </div>
                }

                {searchedKeyword && <div className="saved-transcripts">
                    <h3> Videos containing a match for <i>'{searchedKeyword}'</i> in your other saves</h3>
                    {savedRaws.map((item) => {
                        return item.fields.vidId != currentVideoId && (
                            <div key={item.pk}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>{item.fields.title}</Typography>
                                    <span>
                                        <IconButton onClick={() => {
                                            setCurrentVideoId(item.fields.vidId);
                                            fetchTranscript(item.fields.vidId);
                                        }}>
                                            <PlayCircleFilled />
                                        </IconButton>
                                    </span>

                                </Box>
                            </div>
                        )
                    })}
                </div>}
            </div >
        </div>
    )
}
export default TranscriptSearch