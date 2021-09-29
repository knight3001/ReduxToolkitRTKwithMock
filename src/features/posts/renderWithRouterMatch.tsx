import React from "react";
import { Router, Route, RouteComponentProps } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export default function renderWithRouterMatch(
  ui: React.FunctionComponent<RouteComponentProps>,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    ),
  };
}
