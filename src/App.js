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
import Header from './Components/Header';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import BloomContextProvider from './Hooks/BloomContextProvider';
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
    <BloomContextProvider>
    <ChakraProvider theme={theme2}>
      <Box textAlign="center" fontSize="xl" bg="blue.100">
        <Header />
        <Center>
          <NatureCardDisplay />
        </Center>
      </Box>
      <AmplifySignOut />
    </ChakraProvider>
    </BloomContextProvider>

  );
}

export default withAuthenticator(App);
