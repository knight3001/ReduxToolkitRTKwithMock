import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../app/services/posts";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import StyledButton from "../../app/components/StyledButton";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditablePostName = ({
  name: initialName,
  onUpdate,
  onCancel,
  isLoading = false,
}: {
  name: string;
  onUpdate: (name: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) => {
  const [name, setName] = useState(initialName);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setName(value);

  const handleUpdate = () => onUpdate(name);
  const handleCancel = () => onCancel();

  return (
    <>
      <Grid item xs={10}>
        <TextField
          fullWidth
          variant="outlined"
          disabled={isLoading}
          onChange={handleChange}
          value={name}
        />
      </Grid>
      <Grid item xs={2}>
        <StyledButton
          variant="contained"
          mr={1}
          onClick={handleUpdate}
          disabled={isLoading}
        >
          Update
        </StyledButton>
        <IconButton
          color="secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </>
  );
};

const PostJsonDetail = ({ id }: { id: string }) => {
  const { data: post } = useGetPostQuery(id);

  return (
    <Grid item xs={12}>
      <Box mt={5} bgcolor="#eee">
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </Box>
    </Grid>
  );
};

export const PostDetail = () => {
  const { id } = useParams<{ id: any }>();
  const { push } = useHistory();

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { data: post, isLoading } = useGetPostQuery(id);

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <Box textAlign="center" height="200px">
        <Typography variant="h5">
          Post {id} is missing! Try reloading or selecting another post...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        {isEditing ? (
          <EditablePostName
            name={post.name}
            onUpdate={async (name) => {
              try {
                await updatePost({ id, name }).unwrap();
              } catch {
                setOpen(true);
              } finally {
                setIsEditing(false);
              }
            }}
            onCancel={() => setIsEditing(false)}
            isLoading={isUpdating}
          />
        ) : (
          <>
            <Grid item xs={8}>
              <Typography variant="h5">{post.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <StyledButton
                mr={1}
                variant="contained"
                onClick={() => setIsEditing(true)}
                disabled={isDeleting || isUpdating}
              >
                {isUpdating ? "Updating..." : "Edit"}
              </StyledButton>
              <Button
                variant="contained"
                onClick={() => deletePost(id).then(() => push("/posts"))}
                disabled={isDeleting}
                color="secondary"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </Grid>
          </>
        )}
        <PostJsonDetail id={post.id} />
      </Grid>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          We couldn't save your changes, try again!
        </Alert>
      </Snackbar>
    </>
  );
};
