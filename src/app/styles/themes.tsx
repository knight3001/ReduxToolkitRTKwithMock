import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}

const basePalette = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
};

export const myTheme = createTheme({
  ...basePalette,
  palette: {
    ...basePalette,
    primary: {
      light: "#479bba",
      main: "#1a83a9",
      dark: "#146887",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ba6647",
      main: "#a9401a",
      dark: "#873314",
    },
  },
});
