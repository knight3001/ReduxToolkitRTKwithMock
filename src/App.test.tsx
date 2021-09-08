import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./app/services/posts";
import PageRoute from "./app/navs/PageRoute";

test("renders manage posts title", () => {
  const { getByText } = render(
    <ApiProvider api={api}>
      <PageRoute />
    </ApiProvider>
  );

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
