import React from 'react';
import { Route, Switch } from 'react-router-dom'
import IpfsRouter from 'ipfs-react-router'

import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

import HomePage from './pages/home'
import CheckPage from './pages/check'
import NotFoundPage from './pages/notFoundPage'


export const App = () => {
  return (
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <IpfsRouter>
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route path="/">
                <CheckPage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </IpfsRouter>
        </Grid>
      </Box>
    </ChakraProvider>
  )  
}
