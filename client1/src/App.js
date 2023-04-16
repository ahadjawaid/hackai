import { Container, Box } from "@mui/material"
import Bar from "./components/Bar";
import Hero from "./components/Hero";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Demo from "./components/Demo";

function App() {
  return (
    <Box>
      <Container maxWidth="md">
        <Bar />
        <Hero />
        <Box paddingBottom="3rem" sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ArrowDownwardIcon />
        </Box> 
        <Demo />
      </Container>
      <Box sx={{height: '5rem'}}></Box>
    </Box>
    
  );
}

export default App;
