import React from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  Text,
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
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import BloomContextProvider from './Hooks/BloomContextProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './Components/About';
import Home from './Components/Home';

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
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
          </Switch>
        </Router>

        <AmplifySignOut />
      </ChakraProvider>
    </BloomContextProvider>
  );
}

export default withAuthenticator(App);
