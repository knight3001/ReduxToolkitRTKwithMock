import { createMuiTheme } from "@material-ui/core/styles";

const basePalette = {};

const baseTheme = createMuiTheme({
  overrides: {},
});

export const myTheme = createMuiTheme({
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
