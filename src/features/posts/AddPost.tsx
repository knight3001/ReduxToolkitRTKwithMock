import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuid } from "uuid";

import { Post, useAddPostMutation } from "../../app/services/posts";

type Inputs = {
  name: string;
};

const schema = yup.object().shape({
  name: yup.string().required().min(3),
});

const AddPost = () => {
  const [addPost, { isLoading }] = useAddPostMutation();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    addPost({ id: uuid(), name: data.name }).then(() =>
      reset({ ...getValues(), name: "" })
    );

  /* const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }; */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={1.25} display="flex">
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={11}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter post name"
                  label="Post name"
                  variant="outlined"
                  error={Boolean(!!watch("name") && watch("name").length < 3)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <p style={{ display: errors.name ? "block" : "none" }}>
              {errors.name?.message}
            </p>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              type="submit"
            >
              Add Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddPost;
