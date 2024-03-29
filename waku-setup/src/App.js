import { useEffect, useState } from "react";
import "./App.css";
import WakuChat from "./pages/WakuChat";
// Waku imports
import { LightNodeProvider, ContentPairProvider } from "@waku/react";
import { Protocols } from "@waku/sdk";

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
    <LightNodeProvider
      options={{ defaultBootstrap: true }}
      protocols={[Protocols.Store, Protocols.Filter, Protocols.LightPush]}
    >
      <div>
        <ContentPairProvider contentTopic={"/wakuchat/" + 333}>
          <WakuChat currentUser={currentUser} />
        </ContentPairProvider>
      </div>
    </LightNodeProvider>
  );
}

export default App;
