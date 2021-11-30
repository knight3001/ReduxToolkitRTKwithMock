import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PostsManager } from "../../features/posts/PostsManager";
import Template from "./Template";
import MultiAutoComplete from "../components/MultiAutoComplete";

const PageRoute = () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route path="/mui" component={MultiAutoComplete} />
        <Route path="/" component={PostsManager} />
      </Switch>
    </Template>
  </BrowserRouter>
);

export default PageRoute;
