import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { worker } from "./mocks/browser";

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
worker.start({ quiet: true }).then(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);
