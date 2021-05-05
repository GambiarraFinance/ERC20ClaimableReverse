import React from "react";
import { useFetch } from "../hooks/useFetch";

import { Heading,
List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"

function AllAddress() {
    const [data, loading] = useFetch(
        "https://gist.githubusercontent.com/developerfred/9e76c71a987466fe314422c13196d418/raw/323f1641e2001620383ecf995cf08c3f4eb5dfe7/proof.json"
    );

    return (
        <>
        <Heading>
            List of Addresses Fit for Claim
        </Heading>
        {loading ? (
            "Loading..."
        ) : (
        <List spacing={3}>
        {data[0].leaves.map(({ index, amount, address, proof }) => (
            <ListItem>
                 {`${index} - ${address} - Amount: ${amount}`}   
            </ListItem>
        ))}
        </List>
        )}
    </>
    );
}

export default AllAddress;