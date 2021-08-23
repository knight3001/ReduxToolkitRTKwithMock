import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PostsManager } from "../../features/posts/PostsManager";
import Template from "./Template";

const PageRoute = () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route path="/" component={PostsManager} />
      </Switch>
    </Template>
  </BrowserRouter>
);

export default PageRoute;
