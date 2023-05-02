import React from "react"
import Search from "./Search"

function TranscriptSearch ({ setVidMode }) {
    const [keyword, setKeyword] = React.useState('')

    const handleSubmit = () => {

    }

    return (
        <div>
            <Search title={"Search Saved Transcripts"} input={keyword} setInput={setKeyword} placeholder={"Enter a search keyword"} handleSubmit={handleSubmit}></Search>
            {keyword}
        </div >

    )
}
export default TranscriptSearch