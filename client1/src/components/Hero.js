import { Box, Button, Typography } from "@mui/material";


const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: '5rem'
}

const title = {
    text: "Read on the fly, free up your time",
    weight: "700",
    size: "2rem",
    pb: "1rem",
    style: {
        backgroundImage: 'linear-gradient(to bottom, #b44747, #ffab00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
  },
}

const description = {
    text: "Experience the freedom of learning on-the-go: Let Bookify turn your favorite books and research papers into easy-to-listen audio formats",
    weight: "400",
    size: "1rem",
    pb: "1rem",
    color: "#161b22",
}

const image = {
    path: "open-book.png",
    style: {
        height: "15rem",
    }
}

const button = {
    text: "Try it now!",
    href: "#demo",
    size: "small",
    style: {
        textTransform: 'capitalize',
        color: "#e6f9ff",
        backgroundColor: "#e68917",
        ":hover": {
            backgroundColor: "#bc523e"
        }
    }
}

function Hero() {
    return (
        <Box sx={containerStyle} paddingBottom="5rem">
            <Box sx={{ maxWidth: "55%" }}>
                <Typography sx={title.style} paddingBottom={title.pb} fontSize={title.size} fontWeight={title.weight}>
                    {title.text}
                </Typography>
                <Typography color={description.color} paddingBottom={description.pb} fontSize={description.size} 
                fontWeight={description.weight}>{
                    description.text}
                </Typography> 
                <Button className="button-hover" variant="contained" color={button.color} size={button.size} href={button.href} sx={button.style}>
                    {button.text}
                </Button>
            </Box>
            <Box>
                <img style={image.style}  src={image.path} />
            </Box>
        </Box>
    );
}

export default Hero;