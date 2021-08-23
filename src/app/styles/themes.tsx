import { createMuiTheme } from "@material-ui/core/styles";

const basePalette = {};

const baseTheme = createMuiTheme({
  overrides: {},
});

export const myTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...basePalette,
  },
});
