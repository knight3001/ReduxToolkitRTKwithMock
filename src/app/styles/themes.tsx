import { createTheme } from "@material-ui/core/styles";

const basePalette = {};

const baseTheme = createTheme({
  overrides: {},
});

export const myTheme = createTheme({
  ...baseTheme,
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
