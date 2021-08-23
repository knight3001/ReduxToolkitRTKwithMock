// @flow
import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { ChakraProvider } from "@chakra-ui/react";

import { myTheme } from "../styles/themes";

type TemplatePropsType = {
  children?: ReactNode;
};

function Template(props: TemplatePropsType) {
  return (
    <ChakraProvider>
      <MuiThemeProvider theme={myTheme}>{props.children}</MuiThemeProvider>
    </ChakraProvider>
  );
}

export default Template;
