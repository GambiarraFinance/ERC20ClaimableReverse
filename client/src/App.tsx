import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Button, 
  ButtonGroup,
  Stack,
  Heading
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Heading as="h2" size="2xl">
            Check your address
          </Heading>
          <Stack spacing={6}>  
            <Input placeholder="0x000000000000000000000000000000" /> 
          </Stack>
          <Button colorScheme="teal" size="lg">
            Verify
          </Button>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
