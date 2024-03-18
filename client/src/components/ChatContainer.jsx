import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Invite from "./Invite";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/APIRouters";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const fetchData = async () => {
        try {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchData();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="username">
                <Invite />
                <h3 className="chat-user-name">{currentChat.username}</h3>
              </div>
            </div>
              <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div({
  display: "grid",
  gridTemplateRows: "10% 80% 10%",
  gap: "0.1rem",
  overflow: "hidden",
  "@media screen and (min-width: 720px) and (max-width: 1080px)": {
    gridTemplateRows: "15% 70% 15%",
  },
  ".chat-header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
    ".user-details": {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      ".username": {
        display: "flex",
        alignItems: "center",
      },
      ".chat-user-name": {
        marginLeft: "80px", 
        color: "white",
      },
    },
  },
  ".chat-messages": {
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.2rem",
      "&-thumb": {
        backgroundColor: "#ffffff39",
        width: "0.1rem",
        borderRadius: "1rem",
      },
    },
    ".message": {
      display: "flex",
      alignItems: "center",
      ".content": {
        maxWidth: "40%",
        overflowWrap: "break-word",
        padding: "1rem",
        fontSize: "1.1rem",
        borderRadius: "1rem",
        color: "#d1d1d1",
        "@media screen and (min-width: 720px) and (max-width: 1080px)": {
          maxWidth: "70%",
        },
      },
    },
    ".sended": {
      justifyContent: "flex-end",
      ".content": {
        backgroundColor: "#4f04ff21",
      },
    },
    ".received": {
      justifyContent: "flex-start",
      ".content": {
        backgroundColor: "#9900ff20",
      },
    },
  },
});

export default ChatContainer;
