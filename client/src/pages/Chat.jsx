import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRouters";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      socket.disconnect();
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (currentUser) {
                const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(response.data);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };
    fetchData();
}, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          
        />
        {
          isLoaded && currentChat === undefined ?
          <Welcome currentUser={currentUser}/> :
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        }
      </div>
    </Container>
  );
}

const Container = styled.div({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  alignItems: "center",
  backgroundColor: "#131324",
  ".container": {
    height: "85vh",
    width: "85vw",
    backgroundColor: "#00000076",
    display: "grid",
    gridTemplateColumns: "25% 75%",
    "@media screen and (min-width: 720px) and (max-width: 1080px)": {
      gridTemplateColumns: "35% 65%",
    },
  },
});

export default Chat;
