import React from 'react';
import {
  Box,
  Img,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import UploadABloom from './UploadABloom';

const Header = ({ name, img, description }) => {
  return (
    <Box w="full" h="100px" bg="pink.100">
      <Heading ml="15px" mt="20px" float="left" fontFamily="Allison" size="3xl">
        Bloom
      </Heading>
      {/* <SizeExample/> */}
      <UploadABloom/>
    </Box>
  );
};

export default Header;
