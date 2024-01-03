import { useEffect, useState } from "react";
import {
  getSpotPriceOfTokensByAddresses,
  getTokenBalancesOfWalletAddress,
  getTokenDetailsByAddresses,
} from "../actions/serverActions";
import { Box, Typography } from "@mui/material";
import Web3 from "web3";

let styles = {
  card: {
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "400px",
    height: "100%",
    border: "10px solid #f9f9f9",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
  },

  summaryCardOther: {
    background: "linear-gradient(to bottom, #464646, #464646)",
    backgroundImage: `url(''), linear-gradient(#f9f9f9, #ffffff)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
  },
  summaryCardBalance: {
    // backgroundColor: "#ffffff",

    background: "linear-gradient(to bottom, #D72B66, #D72B66)",
    backgroundImage: `url(''), linear-gradient(#f9f9f9, #ffffff)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
  },

  summaryCard: {
    // backgroundColor: "#ffffff",
    background: "linear-gradient(to bottom, #6385f3, #5a7ff2)",
    backgroundImage: `url("eth-background.jpg"), linear-gradient(#9DA7DA, #5C6AC0)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 170,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
  },
  inputCard: {
    // backgroundColor: "#ffffff",
    backgroundColor: "#EEEFF3",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
  },
  buttonConnect: {
    marginTop: 10,
    backgroundColor: "#0029FF",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.5625rem",
    width: "100%",
    height: 44,
    "&:hover": {
      backgroundColor: "#6385f3",
      color: "white",
    },
  },
  select: {
    color: "black",
    fontSize: 14,
    fontWeight: 600,
    border: "none", // Remove the border
    borderRadius: 10, // Remove border-radius
    marginLeft: 10,
    marginRight: 10,
    padding: 4,
    paddingLeft: 10,
    background: "#DFE3E7", // Make the background transparent
  },
  inputWrapper: {
    padding: "6px 20px 6px 20px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
    color: "black",

    // background: 'linear-gradient(to bottom, #6385f3, #5a7ff2)'
  },
};

function UserPortfolio({ currentUser }) {
  const [totalWorth, setTotalWorth] = useState(0);
  const [portfolioData, setPortfolioData] = useState(null);
  const [balancesData, setBalancesData] = useState(null);
  const [tokensData, setTokensData] = useState(null);
  const [pricesData, setPricesData] = useState(null);

  // Fetch Balances of user
  useEffect(() => {
    if (currentUser) {
      async function asyncFn() {
        // 1. Fetch balances of user
        let balancesDataTemp = await getTokenBalancesOfWalletAddress(
          currentUser
        );

        if (balancesDataTemp) {
          const filteredData = Object.keys(balancesDataTemp)
            .filter((key) => parseInt(balancesDataTemp[key]) > 0)
            .reduce((obj, key) => {
              obj[key] = balancesDataTemp[key];
              return obj;
            }, {});

          //2.  Filtering all the addresses which have balance more than 0
          let activeAddresses = Object.keys(filteredData);
          setBalancesData(filteredData);

          // 3. Fetch token data by address
          setTimeout(async () => {
            let tokenDataTemp = await getTokenDetailsByAddresses(
              activeAddresses
            );
            setTokensData(tokenDataTemp);
          }, 1500);

          // 4. Fetch spot price of token by address
          setTimeout(async () => {
            let pricesDataTemp = await getSpotPriceOfTokensByAddresses(
              activeAddresses.toString()
            );
            setPricesData(pricesDataTemp);
          }, 3500);
        }
      }

      asyncFn();
    }
  }, [currentUser]);

  // Building portfolio
  useEffect(() => {
    if (balancesData && pricesData && tokensData) {
      const filteredAddresses = Object.keys(balancesData);
      let tempTotalWorth = 0;
      // Calculating portfolio balances based on data
      let finalData = filteredAddresses.map((singleAdd) => {
        let priceInEth = parseFloat(
          Web3.utils.fromWei(pricesData[singleAdd], "ether")
        ).toFixed(2);
        let balance = parseFloat(
          Web3.utils.fromWei(balancesData[singleAdd], "ether")
        ).toFixed(2);
        tempTotalWorth += priceInEth * balance;

        return {
          name: tokensData[singleAdd].name,
          symbol: tokensData[singleAdd].symbol,
          logo: tokensData[singleAdd].logoURI,
          price: priceInEth,
          amount: balance,
          valueInUsd: priceInEth * balance,
        };
      });
      setTotalWorth(tempTotalWorth);
      setPortfolioData(finalData);
    }
  }, [balancesData, pricesData, tokensData]);

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        color: "white",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
      }}
    >
      <h3 style={{ textAlign: "center", marginTop: 10 }}>User Portfolio</h3>

      <div className="d-flex justify-content-center">
        <div style={styles.card}>
          <Box style={styles.summaryCard}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <img
                  src="https://tokens-data.1inch.io/images/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
                  height="24px"
                  width="24px"
                  style={{ borderRadius: "50%" }}
                />{" "}
                <Typography
                  fontSize={12}
                  fontWeight={600}
                  color={"#f9f9f9"}
                  textAlign={"center"}
                  ml={1}
                >
                  Polygon Network
                </Typography>
              </Box>

              <Typography
                style={{ textTransform: "capitalize" }}
                variant="body2"
                fontWeight={500}
                fontSize={14}
                color={"#ffffff"}
              >
                Portfolio Balance
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h1"
                fontSize={44}
                fontWeight={800}
                color={"#f9f9f9"}
                textAlign={"center"}
                py={2}
              >
                ${parseFloat(totalWorth).toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                fontSize={12}
                fontWeight={400}
                color={"#f9f9f9"}
                textAlign={"center"}
              >
                Available balance
              </Typography>
            </Box>
          </Box>
          <div
            style={{
              marginTop: 20,
              marginBottom: 40,
              overflowY: "auto",
              height: 300,
            }}
          >
            <Box className={styles.summaryCardOther}>
              <Typography
                variant="body2"
                fontSize={15}
                fontWeight={700}
                color={"#000000"}
                textAlign={"left"}
                my={1}
              >
                Tokens
              </Typography>

              {/* //Code fo tokens */}
              {portfolioData &&
                portfolioData.map((singleToken, index) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      mb={2}
                      style={{
                        backgroundColor: "#e5e5e5",
                        padding: 10,
                        borderRadius: 14,
                      }}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                      >
                        <Box>
                          <img
                            src={singleToken.logo}
                            height="30px"
                            width="30px"
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>
                        <Box
                          ml={1}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"flex-start"}
                          alignItems={"flex-start"}
                        >
                          <Typography
                            fontSize={12}
                            fontWeight={600}
                            color={"#272727"}
                            textAlign={"center"}
                          >
                            {singleToken.symbol}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize={12}
                            fontWeight={300}
                            color={"#757575"}
                            textAlign={"center"}
                          >
                            {singleToken.name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box
                          ml={1}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"flex-end"}
                        >
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight={600}
                            color={"#272727"}
                            textAlign={"center"}
                          >
                            {singleToken.amount}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize={11}
                            fontWeight={300}
                            color={"#616161"}
                            textAlign={"center"}
                          >
                            ${singleToken.valueInUsd}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPortfolio;
