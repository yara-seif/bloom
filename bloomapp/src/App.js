import React from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { extendTheme } from '@chakra-ui/react';
import { Logo } from './Logo';
import NatureCardDisplay from './Components/NatureCardDisplay';
const theme2 = extendTheme({
  colors: {
    blue: {
      100: '#93B5C6',
    },
    gray: {
      100: '#C9CCD5',
    },
    gray_pink: {
      100: '#E4D8DC',
    },
    pink: {
      100: '#FFE3E3',
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme2}>
      <Box textAlign="center" fontSize="xl" bg="blue.100">
        <Center>
          <NatureCardDisplay />
        </Center>
        {/* <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
