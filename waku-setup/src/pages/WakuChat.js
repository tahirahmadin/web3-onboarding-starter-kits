import { useEffect, useState } from "react";
import {
  useWaku,
  useContentPair,
  useLightPush,
  useStoreMessages,
  useFilterMessages,
} from "@waku/react";
import protobuf from "protobufjs";

let styles = {
  button: {
    width: "100%",
    maxWidth: 200,
    cursor: "pointer",
    background: "#0164FF",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    color: "#f9f9f9",
    fontWeight: 700,
    padding: "12px 30px 12px 30px",
    marginTop: 4,
    display: "flex",
    justifyContent: "center",
    border: "none",
  },
  card: {
    position: "relative",
    backgroundColor: "#000000",
    marginBottom: 5,
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 14,
    paddingRight: 14,
    width: 400,
    height: "100%",
    minHeight: 450,

    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
  },
};

function WakuChat({ currentUser }) {
  // Local states
  const [inputValue, setInputValue] = useState("");
  const [allChats, setAllChats] = useState(null);
  //waku states
  const [nodeStart, setNodeStart] = useState(false);

  // Waku Node
  const { node } = useWaku();
  const { decoder, encoder } = useContentPair();
  const { messages: storeMessages } = useStoreMessages({
    node,
    decoder,
  });
  const { messages: filterMessages } = useFilterMessages({ node, decoder });
  const { push } = useLightPush({ node, encoder });

  // Let user address
  let otherUser =
    currentUser === "0x30EFDEBD9b328bcD3e1e8Cc806c5c3001F6DC870"
      ? "0x87228Dd1eca832d14f4aB0CFb99c471195E7f6dB"
      : "0x30EFDEBD9b328bcD3e1e8Cc806c5c3001F6DC870";

  // Structure of message for Waku
  const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("from", 2, "string"))
    .add(new protobuf.Field("to", 3, "string"))
    .add(new protobuf.Field("messageValue", 4, "string"));

  // Start the node
  useEffect(() => {
    if (node !== undefined) {
      setNodeStart(true);
    }
  }, [node]);

  // To fetch new messages
  useEffect(() => {
    setAllChats(null);
    let messages = storeMessages.concat(filterMessages);

    messages = messages.map((message) => decodeMessage(message));

    setAllChats(messages);
  }, [storeMessages, filterMessages]);

  // Function to send message
  const handleSendMessage = async () => {
    await sendMessage(currentUser, inputValue);
    setInputValue("");
  };

  // Waku inner function to handle messaging
  async function sendMessage(fromAddress, messageValue) {
    // message structure creation
    const protoMessage = ChatMessage.create({
      timestamp: Date.now(),
      from: fromAddress,
      to: otherUser,
      messageValue,
    });

    const serialisedMessage = ChatMessage.encode(protoMessage).finish();

    const timestamp = new Date();

    await push({
      payload: serialisedMessage,
      timestamp,
    });
  }

  function decodeMessage(wakuMessage) {
    if (!wakuMessage.payload) return;

    const { timestamp, from, to, messageValue } = ChatMessage.decode(
      wakuMessage.payload
    );

    if (!timestamp || !from || !to || !messageValue) return;

    const time = new Date();
    time.setTime(Number(timestamp));

    return {
      timestamp: time,
      from,
      to,
      messageValue,
      timestampInt: wakuMessage.timestamp,
    };
  }
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
      <h3 style={{ textAlign: "center", marginTop: 10 }}>Waku Chat</h3>

      <div className="d-flex justify-content-center">
        <div style={styles.card}>
          <div className="d-flex justify-content-start align-items-center">
            <img
              src="https://cdn2.vectorstock.com/i/1000x1000/25/51/arrow-return-or-reply-the-white-color-icon-vector-15662551.jpg"
              style={{
                height: 30,
                borderRadius: "50%",
                padding: -5,
              }}
            />
            <h6
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 20,
                paddingLeft: 5,
              }}
            >
              Chat
            </h6>
          </div>

          <div
            style={{
              marginTop: 20,
              marginBottom: 40,
              overflowY: "auto",
              height: 450,
            }}
          >
            {allChats &&
              allChats.map((singleChat, index) => {
                return singleChat.from != currentUser ? (
                  <div
                    key={index}
                    className="d-flex justify-content-start mb-2"
                  >
                    <div
                      style={{
                        textAlign: "left",
                        color: "#bdbdbd",
                        backgroundColor: "#26292C",
                        borderRadius: 14,
                        padding: 10,
                        width: 300,
                      }}
                    >
                      <h6
                        style={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        {singleChat.from === currentUser ? "You" : "User"}
                      </h6>
                      <p
                        style={{
                          color: "#bdbdbd",
                          fontWeight: 400,
                          fontSize: 14,
                          padding: 0,
                          marginBottom: 0,
                        }}
                      >
                        {singleChat.messageValue}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-end mb-2">
                    <div
                      style={{
                        textAlign: "left",
                        color: "#bdbdbd",
                        backgroundColor: "#26292C",
                        borderRadius: 14,
                        padding: 10,
                        width: 300,
                      }}
                    >
                      <h6
                        style={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        {singleChat.from === currentUser ? "You" : "User"}
                      </h6>
                      <p
                        style={{
                          color: "#bdbdbd",
                          fontWeight: 400,
                          fontSize: 14,
                          padding: 0,
                          marginBottom: 0,
                        }}
                      >
                        {singleChat.messageValue}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 8,
              width: "94%",
            }}
          >
            <div className="d-flex justify-content-center">
              <input
                placeholder="Enter your message...."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  backgroundColor: "#f9f9f9",
                  outline: "none",
                  width: "100%",
                  borderRadius: 12,
                  height: 50,
                  padding: 10,
                  border: "none",
                }}
              />

              <div>
                <button
                  disabled={!nodeStart}
                  onClick={handleSendMessage}
                  style={{
                    backgroundColor: nodeStart ? "#2F4DC5" : "red",
                    outline: "none",
                    width: "100%",
                    borderRadius: 12,
                    height: 50,
                    padding: 10,
                    border: "none",
                    color: "#f9f9f9",
                    fontWeight: 600,
                    paddingLeft: 12,
                    paddingRight: 12,
                    marginLeft: 5,
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WakuChat;
