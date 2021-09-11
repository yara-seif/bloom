import React from 'react';
import {
  Box,
  Button,
  Img,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import UploadABloom from './UploadABloom';
import { Link, withRouter } from 'react-router-dom';

const Header = ({ name, img, description }) => {
  return (
    <Box w="full" h={{ base: '80px', md: '100px' }} bg="pink.100">
      <Flex alignItems="flex-end">
        <Link to="/">
          <Heading
            ml={{ base: '10px', md: '15px' }}
            mt={{ base: '25px', md: '20px' }}
            float="left"
            fontFamily="Allison"
            fontSize={{ base: '30px', md: '50px' }}
          >
            Memories
          </Heading>
        </Link>
        <Link to="/about">
          <Heading
            ml={{ base: '10px', md: '25px' }}
            mt={{ base: '25px', md: '20px' }}
            float="left"
            fontFamily="Allison"
            fontSize={{ base: '15px', md: '30px' }}
          >
            About
          </Heading>
        </Link>
        <UploadABloom />
      </Flex>
    </Box>
  );
};

export default Header;
