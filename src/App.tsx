import PageRoute from "./app/navs/PageRoute";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { api } from "./app/services/posts";

function App() {
  return (
    <ApiProvider api={api}>
      <PageRoute />
    </ApiProvider>
  );
}

export default App;
