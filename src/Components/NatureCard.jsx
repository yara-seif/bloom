import React from 'react';
import {
  Box,
  Img,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { BloomContext } from '../Hooks/BloomContextProvider';
import { API, Storage } from 'aws-amplify';
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
} from './../graphql/mutations';

const NatureCard = ({ name, img, description, id }) => {
  const { blooms, setBlooms } = React.useContext(BloomContext);
  async function deleteNote(id) {
    // const newNotesArray = notes.filter(note => note.id !== id);
    const newNotesArray = blooms.filter(bloom => bloom.id !== id);
    setBlooms(newNotesArray);
    // setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
  return (
    <Box w="250px" h="350px" bg="pink.100" borderRadius="lg">
      <Box h="200">
        {img == null ? (
          <Box w="full" h="full" bg="gray.100" borderTopRadius="lg"></Box>
        ) : (
          <Img
            borderRadius="lg"
            alt=""
            width="100%"
            height="100%"
            objectFit="cover"
            src={img}
          />
        )}
      </Box>
      <VStack
        position="absolute"
        ml="7px"
        float="left"
        alignItems="flex-start"
        w="240px"
      >
        <Heading fontFamily="Allison" size="lg">
          {name}
        </Heading>

        <Text fontSize="sm"> {description} </Text>
      </VStack>
      <Button
        mt={{ base: '30%', md: '8%' }}
        position="absolute"
        float="right"
        ml={{ base: '6%', md: '2%' }}
        size="sm"
        bg="blue.100"
        fontFamily="Allison"
        fontSize="20px"
        onClick={() => deleteNote(id)}
      >
        Delete memory
      </Button>
    </Box>
  );
};

export default NatureCard;
