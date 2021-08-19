import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { MdBook } from "react-icons/md";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useGetPostQuery, useGetPostsQuery } from "../../app/services/posts";
import { PostDetail } from "./PostDetail";
import AddPost from "./AddPost";

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
    <List spacing={3}>
      {posts.map(({ id, name }) => (
        <ListItem key={id} onClick={() => push(`/posts/${id}`)}>
          <ListIcon as={MdBook} color="green.500" /> {name}
        </ListItem>
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
      <ListIcon as={MdBook} color="green.500" /> {data.name}
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
    <List spacing={3}>
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
    <Stat>
      <StatLabel>Active Posts</StatLabel>
      <StatNumber>{posts?.length}</StatNumber>
    </Stat>
  );
};

export const PostsManager = () => {
  return (
    <Box>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl">Manage Posts</Heading>
        </Box>
        <Spacer />
        <Box>
          <PostsCountStat />
        </Box>
      </Flex>
      <Divider />
      <AddPost />
      <Divider />
      <Flex wrap="wrap">
        <Box flex={1} borderRight="1px solid #eee">
          <Box p={4} borderBottom="1px solid #eee">
            <Heading size="sm">Posts</Heading>
          </Box>
          <Box p={4}>
            <PostList />
          </Box>
          <Box p={4} borderBottom="1px solid #eee">
            <Heading size="sm">Posts (subscribed)</Heading>
          </Box>
          <Box p={4}>
            <PostListSubscribed />
          </Box>
        </Box>
        <Box flex={2}>
          <Switch>
            <Route path="/posts/:id" component={PostDetail} />
            <Route>
              <Center h="200px">
                <Heading size="md">Select a post to edit!</Heading>
              </Center>
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Box>
  );
};

export default PostsManager;
