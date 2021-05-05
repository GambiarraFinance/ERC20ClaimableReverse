import React from "react"

import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Icon,
    useColorModeValue,
    createIcon,
} from '@chakra-ui/react';

import AllAddress from '../components/allAddress';

export default function AddressPage() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            py={12}
            >
            <Stack
                boxShadow={'2xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={10}
                spacing={12}
                align={'center'}>
                <AllAddress/>
            </Stack>
        </Flex>
    );
}
