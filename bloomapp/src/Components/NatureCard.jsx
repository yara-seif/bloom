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
    <Box w="250px" h="350px" bg="pink.100" borderRadius="lg">
      <Box h="200">
        {img == null ? (
          <Box w="full" h="full" bg="gray.100" borderTopRadius="lg"></Box>
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
