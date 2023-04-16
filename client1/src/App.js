import { Container, Box } from "@mui/material"
import Bar from "./components/Bar";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import React, {useState, useEffect} from "react";



function App() {
  const [data, setData] = useState([{}])

  useEffect(() =>  {
      fetch("/members").then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
  }, [])
  return (
    <Box>
      <Container maxWidth="md">
        <Bar />
        <Hero />
        <Demo />
      </Container>
    </Box>
    
  );
}

export default App;
