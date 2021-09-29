// @flow
import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { myTheme } from "../styles/themes";

type TemplatePropsType = {
  children?: ReactNode;
};

function Template(props: TemplatePropsType) {
  return <MuiThemeProvider theme={myTheme}>{props.children}</MuiThemeProvider>;
}

export default Template;
