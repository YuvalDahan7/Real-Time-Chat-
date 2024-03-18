import React, {useState} from 'react'
import { GiTicTacToe } from "react-icons/gi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function Invite({socket}) {

  const [recipientUserId, setRecipientUserId] = useState(""); 

  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit("invite-for-game", recipientUserId);
    navigate("/game");
  }

  return (
    <Button onClick={handleClick}>
        <p>Invite for a game &nbsp;</p> 
        <GiTicTacToe /> 
    </Button>   
  )
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
    "p":{
        color: "white"
    }
  });

export default Invite