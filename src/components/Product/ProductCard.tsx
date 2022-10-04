import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Heading,
  VStack,
  Spinner,
  CircularProgress,
  StackDivider,
} from "@chakra-ui/react";

interface Props {
  price: number;
  name: string;
  total: number;
}

const CardTodo: FC<Props> = ({ price, name, total }) => {
  const handleDelete = async () => {};

  return (
    <>
      {price ? (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          sx={{
            padding: "1rem",
            textTransform: "capitalize",
            cursor: "pointer",
            mt: "2rem",
            "& h2": {
              fontSize: "2rem",
            },
            alignItems: "start",
          }}
        >
          <Heading as="h4" size="md">
            price: {price}
          </Heading>
          <Heading as="h4" size="md">
            name: {name}
          </Heading>
          <Heading as="h4" size="md">
            total: {total}
          </Heading>

          <Button onClick={handleDelete}>Delete</Button>
        </VStack>
      ) : (
        <CircularProgress value={59} size="100px" thickness="4px" />
      )}
    </>
  );
};

export default CardTodo;
