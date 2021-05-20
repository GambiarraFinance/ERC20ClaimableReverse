## ERC20 Claimable Reverse 

#### Struct 
 - [api-merkle](https://github.com/GambiarraFinance/api-merkle-airdrop)
 - client
 - [client-uniswap](https://github.com/GambiarraFinance/airdrop-uniswap-interface) 
 - airdrop contract

## Aidrop Contracts 

````
$ cd airdrop
$ cp env.sample .env
````

**add your environment variables to the .env file**

- 1 First you need a csv file like the example ```airdrop_list.csv```.
- 2 go to the script folder and run the command:

```
$ python csv_to_json.py <your-file-airdrop.csv> <output-your-Airdrop>
```

- 3 Update the file ```rawData.ts``` with the information of the output-your-airdrop.

- 5 To compile:
```
npx hardhat compile
```
and you will find the artifacts including abi and bytecode in `build/`

To run the test:
```
npx hardhat test:prepare_data
npx hardhat test:finally
```

### Deploy on Networks 

```
npx hardhat run --network ropsten launch/deploy.js
```
***Change network for your network**

```
┌────────────┬──────────────────────────────────────────────────────────────────────┐
│  (index)   │                                Values                                │
├────────────┼──────────────────────────────────────────────────────────────────────┤
│   start    │                              1620308111                              │
│  end_time  │                              1651844111                              │
│ merkleRoot │ '0x6badc1b0e597887ee42d611117171508ca948711a05ea7aa494d21c3ab5fe877' │
│  Airdrop   │             '0x08Ed2beD63A7a127d95F3Da455e79674553d90bD'             │
└────────────┴──────────────────────────────────────────────────────────────────────┘
```

**Ropsten**
    [0xdB873e8B6F7fbD87b112Ff5BFd2Cb6c7DC36065D](https://ropsten.etherscan.io/address/0xdB873e8B6F7fbD87b112Ff5BFd2Cb6c7DC36065D)
