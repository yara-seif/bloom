import React from 'react';
import {
  Box,
  Button,
  Center,
  Img,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import NatureCardDisplay from './NatureCardDisplay';
import { Link, withRouter } from 'react-router-dom';

const Home = () => {
  return (
    <Box h="100%" textAlign="center" fontSize="xl" bg="blue.100">
      <Center>
        <NatureCardDisplay />
      </Center>
    </Box>
  );
};

export default Home;
