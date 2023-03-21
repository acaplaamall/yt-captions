import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentRaw: null,
      savedRaws: []
    }
  }


  render () {
    return (
      <div>
        <div>Enter a Youtube link</div>
        <TextField id="outlined-basic" label="Link" variant="outlined" />
        <Button variant="text">Submit</Button>

        {this.state.currentRaw && <div>hello {this.state.currentRaw.title} {this.state.currentRaw.text}</div>}
        <div>
          Saved raw transcripts
          {this.state.savedRaws.map((item, i) => {
            return <div key={item.id}>
              <div>{item.title}</div>
            </div>
          })}
        </div>
      </div>
    );
  }
}
export default App;
