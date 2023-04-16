import { Button, Paper, Box, Typography, TextField,InputAdornment, Radio, FormControl, RadioGroup, FormControlLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';




const titleText = "Search Book Title"

const boxStyle = {
    Boxwidth: 300,
    height: 300,
    backgroundColor: "#f8eddb",
    borderRadius: 3
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
  const [selectedBook, setSelectedBook] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  
  
  function handleSearch(event) {
    event.preventDefault();
    fetch('/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(books => {
      setBooks(books); // update the state variable with the first three search results
      setSelectedBook(''); // clear the selected book when the search results change
    })
   .catch(error => {
      console.error(error);
    });
  }

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleRadioChange(event) {
    setSelectedBook(event.target.value);
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedBook) {
      return;
    }
    fetch('/get-audio', {
      method: 'POST',
      body: JSON.stringify({ bookId: selectedBook }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setAudioUrl(data.audioUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
    return (
        
        <Box>
            <Paper sx={boxStyle}>
                <Typography>{titleText}</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <form onSubmit={handleSearch}>
                    <TextField id="search" label="Search" value={query}
          onChange={handleInputChange} type="search" variant="outlined" InputProps={{endAdornment: (
                        <InputAdornment type="search" position="end">
                        <IconButton type="search"  >
                        <SearchIcon />
                        </IconButton>
                        </InputAdornment>), }}>
                    </TextField>
                    </form>
                    <FormControl>
                    <RadioGroup value={selectedBook} onChange={handleRadioChange}>             
                    {books.map(book => (
                        <FormControlLabel key={book.id} value={book.id} control={<Radio />} 
                        label={book.title}/> 
                    ))}
                    </RadioGroup>
                    </FormControl>

                    {selectedBook && (
                      <Button type="submit" variant="contained" size={button.size} sx={button.style} onClick={handleSubmit}>
                          {button.text}
                      </Button>
                    )}

                    {audioUrl && (
                        <audio controls src={audioUrl}></audio>
                    )}
    
                </Box>
            </Paper>
        </Box>
    );
}
export default Demo;