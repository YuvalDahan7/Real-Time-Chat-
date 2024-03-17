import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.jpg";

function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("chat-app-user");
    if (data) {
      const userData = JSON.parse(data);
      setCurrentUserName(userData.username);
    }
  }, []);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.username}</h3>
                   
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div({
  display: "grid",
  gridTemplateRows: "10% 75% 15%",
  overflow: "hidden",
  backgroundColor: "#080420",
  ".brand": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    justifyContent: "center",
    img: {
      height: "2rem",
    },
    h3: {
      color: "white",
      textTransform: "uppercase",
    },
  },
  ".contacts": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    gap: "0.8rem",
    "&::-webkit-scrollbar": {
      width: "0.2rem",
      "&-thumb": {
        backgroundColor: "#ffffff39",
        width: "0.1rem",
        borderRadius: "1rem",
      },
    },
    ".contact": {
      backgroundColor: "#ffffff34",
      minHeight: "5rem",
      cursor: "pointer",
      width: "90%",
      borderRadius: "0.2rem",
      padding: "0.4rem",
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      transition: "0.5s ease-in-out",
      position: "relative", // Added for online status positioning
      ".username": {
        display: "flex",
        alignItems: "center",
        h3: {
          color: "white",
        },
      },
      ".online-status": {
        width: "10px",
        height: "10px",
        backgroundColor: "green",
        borderRadius: "50%",
        position: "absolute",
        right: "-5px",
      },
    },
    ".selected": {
      backgroundColor: "#9a86f3",
    },
  },
  ".current-user": {
    backgroundColor: "#0d0d30",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    ".username": {
      h2: {
        color: "white",
      },
    },
    "@media screen and (min-width: 720px) and (max-width: 1080px)": {
      gap: "0.5rem",
      ".username": {
        h2: {
          fontSize: "1rem",
        },
      },
    },
  },
});

export default Contacts;
