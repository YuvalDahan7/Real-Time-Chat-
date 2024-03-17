import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import styled from "styled-components";
import io from "socket.io-client";
// import axios from "axios";
// import { logoutRoute } from "../utils/APIRouters";

const socket = io("http://localhost:3001"); // Replace with your Socket.IO server URL

function Logout() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
    socket.disconnect();
  }

  return (
    <Button onClick={handleClick}>
      <FaPowerOff/>
    </Button>
  );
}

const Button = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  backgroundColor: "#9a86f3",
  border: "none",
  cursor: "pointer",
  svg: {
    fontSize: "1.3rem",
    color: "#ebe7ff",
  },
});

export default Logout;