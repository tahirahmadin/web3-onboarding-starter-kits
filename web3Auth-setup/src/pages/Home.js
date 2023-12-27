import { Box, Button, Typography } from "@mui/material";
import React from "react";
const Home = () => {
  return (
    <div style={{ paddingTop: 100 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            padding: "6px",
            border: "8px solid #000",
            borderRadius: "50%",
            background: "#fff",
            marginRight: "-50px",
            position: "relative",
            marginTop: "30px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              width: 70,
              height: 70,
              fontWeight: 700,

              background: "#8447e7",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            1
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: 110,
            height: "100%",
            background: "#8447e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            padding: "25px 25px 25px 75px",
            marginTop: "12.5px",
            borderRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            align="left"
            sx={{
              fontWeight: 700,
              fontSize: 30,
              lineHeight: "60%",
              color: "#f9f9f9",
            }}
          >
            CONNECT METAMASK
            <br />
            <br />
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              Address of connected wallet is:
            </span>
          </Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "280px",
              height: "50px",
              background: "#000",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: "33px",
              color: "#f9f9f9",
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "5px 30px 5px 30px",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            Connect Wallet
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            padding: "6px",
            border: "8px solid #000",
            borderRadius: "50%",
            background: "#fff",
            marginRight: "-50px",
            position: "relative",
            marginTop: "30px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              width: 70,
              height: 70,
              fontWeight: 700,

              background: "#8447e7",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: 110,
            height: "100%",
            background: "#8447e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            padding: "25px 25px 25px 75px",
            marginTop: "12.5px",
            borderRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            align="left"
            sx={{
              fontWeight: 700,
              fontSize: 30,
              lineHeight: "60%",
              color: "#000",
            }}
          >
            Get User Balance
            <br />
            <br />
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              Balance Of User:
            </span>
          </Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "280px",
              height: "50px",
              background: "#000",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: "33px",
              color: "#f9f9f9",
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "5px 30px 5px 30px",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            Get Balance
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            padding: "6px",
            border: "8px solid #000",
            borderRadius: "50%",
            background: "#fff",
            marginRight: "-50px",
            position: "relative",
            marginTop: "30px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              width: 70,
              height: 70,
              fontWeight: 700,

              background: "#8447e7",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: 110,
            height: "100%",
            background: "#8447e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            padding: "25px 25px 25px 75px",
            marginTop: "12.5px",
            borderRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            align="left"
            sx={{
              fontWeight: 700,
              fontSize: 30,
              lineHeight: "60%",
              color: "#000",
            }}
          >
            Allowance
            <br />
            <br />
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              User can spend:
            </span>
          </Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "280px",
              height: "50px",
              background: "#000",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: "33px",
              color: "#f9f9f9",
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "5px 30px 5px 30px",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            Approve
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
