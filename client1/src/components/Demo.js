import { Button, Paper, Box, Typography, TextField,InputAdornment, Radio, FormControl, RadioGroup, FormControlLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

const titleText = "Search Book Title"

const boxStyle = {
    minHeight: "60vh",
    backgroundColor: "#f8eddb",
    borderRadius: 3,
    paddingY: "2rem",
    paddingX: "3rem"
}

const button = {
    text: "Submit",
    size: "small",
    style: {
        color: "#fff"
    }
}
function Demo() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [guttenberg, setGuttenberg] = useState(true);
  const [selectedBook, setSelectedBook] = useState('');
  const [showList, setShowList] = useState(false);

  let api = guttenberg ? "/get-guttenberg-audio" : "/get-guttenberg-audio"

  function handleSearch(event) {
    event.preventDefault();

    fetch(api, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      return response.json();
    })
    .then(books => {
      setBooks(books);
      setSelectedBook('');
      setShowList(true);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function handleRadioChangeLibrary(event) {
    console.log(event.target.value == "gutten");
    setGuttenberg(event.target.value == "gutten")
  }

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleRadioChange(event) {
    setSelectedBook(event.target.value);
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedBook) {
      return;
    }

    const res = await fetch('api', {
      method: 'POST',
      body: JSON.stringify({ id: selectedBook }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json();
    const base64Audio = data.audio;

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = `data:audio/wav;base64,${base64Audio}`;
    audioPlayer.load();
  }

    return (    
        <Box>
            <Paper sx={boxStyle}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: "100%"
                }}>
                  <form>
                    <FormControl>
                      <Box>
                        <RadioGroup value={selectedBook} onChange={handleRadioChangeLibrary}>             
                          <FormControlLabel key='gutten' value="gutten" control={<Radio />} label="guttenberg"/> 
                          <FormControlLabel key='arxiv' value="arxiv" control={<Radio />} label="arxiv"/> 
                        </RadioGroup>
                      </Box>
                    </FormControl>
                  </form>
                  <Box paddingBottom="3rem">
                    <Typography paddingBottom="1.25rem" fontSize='1.75rem' fontWeight={200}>
                      {titleText}
                    </Typography>
                    <Box paddingBottom="1rem">
                      <form onSubmit={handleSearch}>
                        <TextField id="search" label="Search" value={query} onChange={handleInputChange}
                          type="search" variant="outlined" InputProps={{endAdornment: (
                            <InputAdornment type="search" position="end">
                            <IconButton type="search"  >
                              <SearchIcon />
                            </IconButton>
                            </InputAdornment>), }}>
                        </TextField>
                      </form>
                    </Box>
                    {showList &&
                    <form>
                      <FormControl>
                        <Box marginBottom="1.25rem">
                          <RadioGroup value={selectedBook} onChange={handleRadioChange}>             
                          {books.map(book => (
                              <FormControlLabel key={book.id} value={book.id} control={<Radio />} 
                              label={book.title}/> 
                          ))}
                          </RadioGroup>
                        </Box>
                        <Button type="submit" variant="contained" size={button.size} 
                                sx={button.style} onClick={handleSubmit}>
                          {button.text}
                        </Button>
                      </FormControl>
                    </form>}
                  </Box>
                  <Box>
                    <audio id="audioPlayer" controls>
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default Demo;