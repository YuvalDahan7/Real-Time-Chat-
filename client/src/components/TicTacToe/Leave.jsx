import React from "react";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import styled from "styled-components";

function Leave() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Button onClick={handleClick}>
        Leave Match
      <ImExit />
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
  width: "100px",
  svg: {
    fontSize: "1.3rem",
    color: "#ebe7ff",
  },
});

export default Leave;
