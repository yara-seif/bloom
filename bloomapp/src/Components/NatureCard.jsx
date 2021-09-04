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

const NatureCard = ({ name, img, description }) => {
  return (
    <Box w="300px" h="400px" bg="gray_pink.100" borderRadius="lg">
      <Box h="250">
        {img == null ? (
          <Box w="full" h="full" bg="blue.100" borderTopRadius="lg"></Box>
        ) : (
          <Img alt="" fluid={img} />
        )}
      </Box>
      <VStack ml="7px" float="left" alignItems="flex-start">
        <Heading fontFamily="Allison" size="lg">
          Name:{name}
        </Heading>

        <Text fontSize="sm"> Description: {description} </Text>
      </VStack>
    </Box>
  );
};

export default NatureCard;
