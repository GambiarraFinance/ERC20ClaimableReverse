import React from "react";
import { useFetch } from "../hooks/useFetch";

function CheckAddress() {
  const [data, loading] = useFetch(
    "https://gist.githubusercontent.com/developerfred/9e76c71a987466fe314422c13196d418/raw/323f1641e2001620383ecf995cf08c3f4eb5dfe7/proof.json"
  );

  const [searchAddress, setSearchAddress] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
    setSearchAddress(event.target.value);
  };

  React.useEffect(() => {
    const results = data.filter(address =>
      address.toLowerCase().includes(searchAddress)
    );
    setSearchResults(results);
  }, [searchAddress]);

  return (
    <>
      <h1>Claim List</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchAddress}
        onChange={handleChange}
      />
      <ul>
         {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {data[0].leaves.map(({ index, amount, address, proof }) => (
            <li key={`proof-${index}`}>
              <p>{`${amount}`}</p>
              <p>{`${address}`}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default CheckAddress;