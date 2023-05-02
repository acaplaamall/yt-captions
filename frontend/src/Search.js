import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import React from 'react';

function Search ({ title, input, placeholder, setInput, handleSubmit }) {

    const [isFocused, setFocused] = React.useState(false)

    return (
        <div className='enter-link'>
            <h2>{title}</h2>
            <div className='enter-link-searchbar'>
                <input value={input} placeholder={placeholder}
                    onFocus={() => { setFocused(true) }}
                    onBlur={() => { setFocused(false) }}
                    onChange={(e) => setInput(e.target.value)} />
                {isFocused && <IconButton className='close-icon' onClick={() => { setInput('') }}>
                    <CloseIcon />
                </IconButton>}
                <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                </IconButton>
            </div>
        </div>

    )

} export default Search