import { MdBook } from "react-icons/md";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

import { useGetPostQuery, useGetPostsQuery } from "../../app/services/posts";
import { PostDetail } from "./PostDetail";
import AddPost from "./AddPost";

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const { push } = useHistory();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts) {
    return <div>No posts :(</div>;
  }

  return (
    <List>
      {posts.map(({ id, name }) => (
        <ListItemLink key={id} href={`/posts/${id}`}>
          <ListItemIcon>
            <MdBook style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemLink>
      ))}
    </List>
  );
};

const PostNameSubscribed = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetPostQuery(id);
  const { push } = useHistory();

  console.log("data", data, isFetching);

  if (!data) return null;

  return (
    <ListItem key={id} onClick={() => push(`/posts/${id}`)}>
      <ListItemIcon>
        <MdBook style={{ color: green[500] }} />
      </ListItemIcon>
      <ListItemText primary={data.name} />
    </ListItem>
  );
};
const PostListSubscribed = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts) {
    return <div>No posts :(</div>;
  }

  return (
    <List>
      {posts.map(({ id }) => (
        <PostNameSubscribed id={id} key={id} />
      ))}
    </List>
  );
};

export const PostsCountStat = () => {
  const { data: posts } = useGetPostsQuery();

  if (!posts) return null;

  return (
    <Box>
      <Typography variant="subtitle1">Active Posts</Typography>
      <Typography variant="subtitle1">{posts?.length}</Typography>
    </Box>
  );
};

export const PostsManager = () => {
  return (
    <Paper>
      <Box
        bgcolor="#011627"
        p={0.5}
        color="white"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4">Manage Posts</Typography>
        </Box>
        <Box>
          <PostsCountStat />
        </Box>
      </Box>
      <Divider />
      <AddPost />
      <Divider />
      <Box display="flex" flexWrap="wrap">
        <Box order={1} borderRight="1px solid #eee">
          <Box p={1} borderBottom="1px solid #eee">
            <Typography variant="subtitle1">Posts</Typography>
          </Box>
          <Box p={1}>
            <PostList />
          </Box>
          <Box p={1} borderBottom="1px solid #eee">
            <Typography variant="subtitle1">Posts (subscribed)</Typography>
          </Box>
          <Box p={1}>
            <PostListSubscribed />
          </Box>
        </Box>

        <Box order={2} flexGrow={1} p={1}>
          <Switch>
            <Route path="/posts/:id" component={PostDetail} />
            <Route>
              <Box height="200px">
                <Typography variant="h5">Select a post to edit!</Typography>
              </Box>
            </Route>
          </Switch>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostsManager;
