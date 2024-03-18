import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("chat-app-user")).username);
  }, []);

  return (
    <Container>
      <div id="Logout">
        <Logout />
      </div>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}</span> !
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  flexDirection: "column",
  img: {
    height: "20rem",
  },
  span: {
    color: "#4e0eff",
  },
  "#Logout" : {
    // width: "max-content",
    justifyContent: "flex-end",
  }
});

export default Welcome;
