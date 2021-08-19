import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
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
      <Flex p={5}>
        <Box flex={10}>
          <FormControl
            isInvalid={Boolean(!!watch("name") && watch("name").length < 3)}
          >
            <FormLabel htmlFor="name">Post name</FormLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Enter post name" />
              )}
            />
            <p>{errors.name?.message}</p>
          </FormControl>
        </Box>
        <Spacer />
        <Box>
          <Button
            mt={8}
            colorScheme="purple"
            isLoading={isLoading}
            type="submit"
          >
            Add Post
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default AddPost;
