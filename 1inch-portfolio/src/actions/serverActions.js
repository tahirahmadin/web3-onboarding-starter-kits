import axios from "axios";

// 1inch backend url
let inchUrl = "https://api.1inch.dev";

// Get token balances of the wallet
export const getTokenBalancesOfWalletAddress = async (address) => {
  const url = `http://localhost:5003/?url=https://api.1inch.dev/balance/v1.2/137/balances/${address}`;
  // Setting up headers
  const config = {
    params: {},
  };
  let response = axios
    .get(url, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

// Get token details by addresses of the wallet
export const getTokenDetailsByAddresses = async (addresses) => {
  let stringAdd = addresses.toString();
  const url = `http://localhost:5003/?url=https://api.1inch.dev/token/v1.2/137/custom?addresses=${stringAdd}`;

  let response = axios
    .get(url, { params: { address: "1232" } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

// Get spot price of tokens by addresses
export const getSpotPriceOfTokensByAddresses = async (addresses) => {
  let callUrl = `https://api.1inch.dev/price/v1.1/137/${addresses.toString()}`;
  const url = `http://localhost:5003/?url=${callUrl}`;

  const config = {
    params: {
      currency: "USD",
    },
  };

  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
