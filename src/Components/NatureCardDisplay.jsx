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
import { Grid, GridItem } from '@chakra-ui/layout';
import NatureCard from './NatureCard';

const NatureCardDisplay = () => {
  const names = [
    ' yo1',
    ' yo2',
    ' yo3',
    ' yo1',
    ' yo2',
    ' yo3',
    ' yo1',
    ' yo2',
    ' yo3',
  ];
  return (
    <Box>
      <Grid
        mt="15%"
        templateColumns={{ base: 'repeat(1, 250px)', md: 'repeat(4, 250px)' }}
        gap="30px"
      >
        {names.map((item, index) => (
          <GridItem>
            <NatureCard name={item} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default NatureCardDisplay;
