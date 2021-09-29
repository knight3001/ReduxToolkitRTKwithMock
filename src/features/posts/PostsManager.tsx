import React from "react";
import {
  Route,
  Switch,
  useHistory,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import BookIcon from "@mui/icons-material/Book";

import { useGetPostQuery, useGetPostsQuery } from "../../app/services/posts";
import { PostDetail } from "./PostDetail";
import AddPost from "./AddPost";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? (
          <ListItemIcon style={{ color: green[500] }}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
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
        <ListItemLink
          key={id}
          to={`/posts/${id}`}
          primary={name}
          icon={<BookIcon />}
        />
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
        <BookIcon style={{ color: green[500] }} />
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
