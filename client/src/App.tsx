import React from 'react';

import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Input,
  Button, 
  Stack,
  Heading,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useRoutes } from 'hookrouter';


// import CheckClaim   from './hooks/checkClaim'
import CheckAddress from './components/checkAddress'
import AllAddress from './components/allAddress'

import HomePage from './pages/home'
import ClaimPage from './pages/claim'
import CheckPage from './pages/check'
import NotFoundPage from './pages/notFoundPage'
import AddressPage from './pages/addresslist'

const routes = {
  '/': () => <HomePage />,
  '/claim': () => <ClaimPage />,
  '/check': () => <CheckPage />,
  '/all' : () => <AddressPage />,
  '/404': () => <NotFoundPage />,
};

export const App = () => {
  const routeResult = useRoutes(routes);
  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {routeResult || <NotFoundPage /> }
        </Grid>
      </Box>
    </ChakraProvider>
  )  
}