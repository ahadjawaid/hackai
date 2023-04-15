import { Box, Typography } from "@mui/material"

const titleText = "Bookify"

const logo = {
    path: "logo192.png",
    style: { height: '3rem', paddingRight: "0.5rem" }
}

const barStyle = {
    display:'flex',
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1.5rem"
}

function Bar() {
    return (
        <Box sx={barStyle}>
            <img style={logo.style} src={logo.path}/>
            <Typography>{titleText}</Typography>
        </Box>
    );
}

export default Bar;