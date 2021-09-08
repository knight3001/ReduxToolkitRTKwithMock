import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import App from "./App";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("renders manage posts title", () => {
  const { getByText } = render(<App />);

  expect(getByText("Manage Posts")).toBeInTheDocument();
});

test("use jest-dom", () => {
  document.body.innerHTML = `
    <span data-testid="not-empty"><span data-testid="empty"></span></span>
    <div data-testid="visible">Visible Example</div>
  `;

  expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement();
  expect(screen.getByText("Visible Example")).toBeVisible();
});
