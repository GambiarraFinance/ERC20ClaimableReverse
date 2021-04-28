## ERC20 Claimable Reverse 

#### Struct 
 - client
 - aidrop 

## Aidrop Contracts 

````
$ cd airdrop
$ cp env.sample .env
````

**add your environment variables to the .env file**

- 1 First you need a csv file like the example ```airdrop_list.csv```.
- 2 go to the script folder and run the compando:

```
$ python csv_to_json.py <your-file-airdrop.csv> <output-yourairdrop>
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
│   start    │                              1619636148                              │
│  end_time  │                              1651172148                              │
│ merkleRoot │ '0xc757f6396bb97c8b95cb833de3a098bb7959b5b6645e24ec6ace15ba6b821453' │
│  Airdrop   │             '0xdB873e8B6F7fbD87b112Ff5BFd2Cb6c7DC36065D'             │
└────────────┴──────────────────────────────────────────────────────────────────────┘
```

**Ropsten**
    [0xdB873e8B6F7fbD87b112Ff5BFd2Cb6c7DC36065D](https://ropsten.etherscan.io/address/0xdB873e8B6F7fbD87b112Ff5BFd2Cb6c7DC36065D)