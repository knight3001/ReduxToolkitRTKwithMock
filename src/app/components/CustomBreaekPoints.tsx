import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "../../app/styles/themes";

const style = {
  flexDirection: "column",
} as const;

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        sx={{
          width: {
            mobile: 100,
            laptop: 300,
          },
        }}
      >
        This box has a responsive width
      </Box>
      <Button sx={style}>Example</Button>
    </ThemeProvider>
  );
}
