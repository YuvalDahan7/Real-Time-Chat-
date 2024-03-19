import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import styled from "styled-components";
import LogoutConfirmation from "./LogoutConfirmation";

function Logout() {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(!pressed);
  };

  return (
    <Button onClick={handleClick}>
      <div>
        <label className="label"> Logout </label>
        {pressed && <LogoutConfirmation />} 
      </div>
      <FaPowerOff />
    </Button>
  );
}

const Button = styled.div({
  display: "flex",
  position: "absolute",
  top: "9%",
  right: "8%",
  flexDirection: "row",
  justifyContent: "flex-end",
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
  label: {
    margin: "7px",
    color: "white",
  },
});

export default Logout;
