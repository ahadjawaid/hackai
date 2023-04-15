import { Container, Box } from "@mui/material"
import Bar from "./components/Bar";
import Hero from "./components/Hero";


function App() {
  return (
    <Box>
      <Container maxWidth="md">
        <Bar />
        <Hero />
      </Container>
    </Box>
    
  );
}

export default App;
