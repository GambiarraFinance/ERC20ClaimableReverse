import React, {useState, useEffect} from "react"
import { proofData } from '../constants/proof/proofs.ts'
import axios from 'axios';

import {  Text } from "@chakra-ui/react"

const merkleRoot = proofData[0].merkleRoot;
const leaves = proofData[0].leaves;
console.log(leaves)

interface IDrop {
  address: string;
  proof: array;
  amount: number;
  index: string;
}

const defaultDrops: IDrop[] = [];

export default function  CheckClaim() {
//     const [drops, setDrops]: [IDrop[], (drops: IDrop[]) => void] = 
//     React.useState(defaultDrops);

//     const [loading, setLoading]: [boolean, (loading: boolean) => void
//     ] = React.useState<boolean>(true);

//     const [error, setError]: [string, (error: string) => void] = 
//     React.useState('');

//     React.useEffect(() => {
//     axios
//       .get<IDrop[]>(leaves, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         timeout: 10000,
//       })
//       .then((response) => {
//         setDrops(response.data);
//         setLoading(false);
//       })
//       .catch((ex) => {
//         let error = axios.isCancel(ex)
//           ? 'Request Cancelled'
//           : ex.code === 'ECONNABORTED'
//           ? 'A timeout has occurred'
//           : ex.response.status === 404
//           ? 'Resource Not Found'
//           : 'An unexpected error has occurred';

//         setError(error);
//         setLoading(false);
//       });
//   }, []);

    return(
    //     <div className="App">
    //     {console.log(leaves)}
    //   {/* {loading && <button onClick={handleCancelClick}>Cancel</button>} */}
    //   <ul className="drops">
    //     {drops.map((drop) => (
    //       <li key={drop.index}>
    //         <h3>{drop.address}</h3>
    //         <p>{post.body}</p>
    //       </li>
    //     ))}
    //   </ul>
    //   {error && <p className="error">{error}</p>}
    // </div>
    <Text> Check Claim Here </Text>
    )
}
   