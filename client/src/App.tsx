import React from 'react';

import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useRoutes } from 'hookrouter';


import HomePage from './pages/home'
import CheckPage from './pages/check'
import NotFoundPage from './pages/notFoundPage'


const routes = {
  '/': () => <HomePage />,
  '/check': () => <CheckPage />,
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