import { Box, Button, Typography } from "@mui/material";


const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
}


const title = {
    text: "Read on the fly free up your time",
    weight: "700",
    size: "2rem",
    pb: "1rem",
}

const description = {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
    weight: "400",
    size: "1rem",
    pb: "1rem",
}

const image = {
    path: "logo512.png",
    style: {
        height: "15rem",
    }
}

const button = {
    text: "Try it now!",
    href: "https://github.com/ahadjawaid/eco/tree/main/client/src",
    size: "small",
    style: {
        color: "#fff",
        backgroundColor: "#0063cc"
    }
}

function Hero() {
    return (
        <Box sx={containerStyle}>
            <Box sx={{ maxWidth: "55%" }}>
                <Typography paddingBottom={title.pb} fontSize={title.size} fontWeight={title.weight}>
                    {title.text}
                </Typography>
                <Typography paddingBottom={description.pb} fontSize={description.size} 
                fontWeight={description.weight}>{
                    description.text}
                </Typography>
                <Button variant="contained" size={button.size} href={button.href} sx={button.style}>
                    {button.text}
                </Button>
            </Box>
            <Box>
                <img style={image.style} src={image.path} />
            </Box>
        </Box>
    );
}

export default Hero;