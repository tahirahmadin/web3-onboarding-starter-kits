import { useEffect, useState } from "react";
import "./App.css";
import UserPortfolio from "./pages/UserPortfolio";
import { CssBaseline } from "@mui/material";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // To fetch the metamask address of the user
  useEffect(() => {
    async function asyncFn() {
      if (typeof window.ethereum !== "undefined") {
        // connects to MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        setCurrentUser(accounts[0]);
      }
    }
    asyncFn();
  }, []);

  return (
    <div style={{ backgroundColor: "#000000", height: "100vh" }}>
      <CssBaseline />
      <UserPortfolio currentUser={currentUser} />
    </div>
  );
}

export default App;
