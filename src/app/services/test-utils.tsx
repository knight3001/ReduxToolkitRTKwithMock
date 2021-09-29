import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { myTheme } from "../styles/themes";

const AllTheProviders: FC = ({ children }) => {
  return <MuiThemeProvider theme={myTheme}>{children}</MuiThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
