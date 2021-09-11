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
import { BloomContext } from '../Hooks/BloomContextProvider';

const NatureCardDisplay = () => {
  const { blooms } = React.useContext(BloomContext);
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
    <Grid
      mt="5%"
      mb="30%"
      templateColumns={{ base: 'repeat(1, 250px)', md: 'repeat(4, 250px)' }}
      gap="30px"
    >
      {blooms.map(bloom => (
        <GridItem>
          <NatureCard
            name={bloom.name}
            img={bloom.image}
            description={bloom.description}
            id={bloom.id}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default NatureCardDisplay;
