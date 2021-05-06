import React, { useState,  useEffect }from "react"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import airdrop_abi  from "../constants/abi/airdrop_abi.json"
import {proofData} from "../constants/proof/proofs"
import useWeb3Modal from "../hooks/useWeb3Modal";

import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';


const network = "ropsten";
const provider = ethers.providers.getDefaultProvider(network, {
    infura: process.env.REACT_APP_INFURA_ID,
    etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY
})

const airdrop_address = '0x08Ed2beD63A7a127d95F3Da455e79674553d90bD'
const abi = airdrop_abi

// call contract airdrop
const airdrop_contract = new ethers.Contract(airdrop_address, abi, provider)

// contract signer
const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
const airdropWithSigner = provider ? airdrop_contract.connect(signer) : loadWeb3Modal();

// proofData leaves
const leaves = proofData[0].leavesWithProof;

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}



export default function CheckPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [hash, setHash] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [claimStatus, setClaimStatus] = useState(false);
    const [alreadyClaimed, setAlreadyClaimed] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();


    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setSearchResults(searchTerm)
        setDataUser(leaves.find(user => user.address === searchTerm))
    }, [searchTerm, dataUser])

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
                spacing={8}
                align={'center'}>
                <Stack align={'center'} spacing={2}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'3xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}>
                        {!claimStatus ? 'Check' : (claimStatus && alreadyClaimed ? 'Already Claimed' : 'Claim') }
                    </Heading>
                    <Text fontSize={'lg'} color={ !claimStatus ? 'gray.500' : 'green.500' }>
                        {!claimStatus ? `Verifiy your address` : (claimStatus && alreadyClaimed ? `Claim: 0` : `Claim: ${dataUser.amount}`) }
                    </Text>
                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
 
                    <Input
                        type={'text'}
                        placeholder={'0x00000000000000000000000'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={!claimStatus ? 0 : 1.2}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: !claimStatus ? 'none' : 'green.800',
                        }}
                        value={searchTerm}
                        onChange={handleChange}
                        isDisabled={claimStatus}
                        hidden={alreadyClaimed}

                    />

                    {!claimStatus ? 
                    <Button
                        bg={'blue.400'}
                        rounded={'full'}
                        color={'white'}
                        flex={'1 0 auto'}
                        _hover={{ bg: 'blue.500' }}
                        _focus={{ bg: 'blue.500' }}
                        onClick={
                            () => airdrop_contract.check(
                                    BigNumber.from(dataUser.index), 
                                    dataUser.address, 
                                    BigNumber.from(dataUser.amount), 
                                    dataUser.proof).then(
                                        function(transaction){
                                            setClaimStatus(transaction.available)
                                            console.log(transaction)
                                        }
                                    ).catch((error) => {
                                        if (error.reason === "Already Claimed"){
                                            setClaimStatus(true)
                                            setAlreadyClaimed(true)
                                        }
                                    })}
                        >
                        Check
                    </Button> : (claimStatus && alreadyClaimed ? 
                    <Button
                        bg={'purple.400'}
                        rounded={'full'}
                        color={'white'}
                        flex={'1 0 auto'}
                        _hover={{ bg: 'purple.500' }}
                        _focus={{ bg: 'purple.500' }}
                        onClick={
                            () => console.log('go to LP')}
                        >
                        Go to LP
                      </Button>

                    :
                    <Stack>
                        
                        <Button
                            bg={'green.400'}
                            rounded={'full'}
                            color={'white'}
                            flex={'1 0 auto'}
                            _hover={{ bg: 'green.500' }}
                            _focus={{ bg: 'green.500' }}
                            onClick={
                                () => airdropWithSigner.claim(
                                        BigNumber.from(dataUser.index),  
                                        BigNumber.from(dataUser.amount), 
                                        dataUser.proof).then(
                                            function(transaction){
                                                setClaimStatus(true)
                                                setAlreadyClaimed(true)
                                                setHash(transaction.hash)
                                            }
                                        ).catch((error) => {
                                            if (error.reason === "Already Claimed"){
                                                setClaimStatus(true)
                                                setAlreadyClaimed(true)
                                            } else {
                                                console.log(error)
                                            }
                                        })}
                            >
                            Claim Now
                            </Button>
                    </Stack> )}
                </Stack>
                <Stack>
                    <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
                </Stack>
            </Stack>
        </Flex>
    );
}
