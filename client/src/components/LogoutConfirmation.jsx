import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LogoutConfirmation() {
  const navigate = useNavigate();
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);

  const onConfirm = () => {
    localStorage.clear();
    navigate("/login");
  };

  const onCancel = () => {
    setShowConfirmMsg(!showConfirmMsg);
  };

  return (
    <ModelBackground>
      <ModelContent>
        <div>
          <h2>
            Are you sure you want to <br /> <span>Log-out ?</span>
          </h2>
        </div>
        <ButtonContainer>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </ButtonContainer>
      </ModelContent>
    </ModelBackground>
  );
}

const ModelBackground = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModelContent = styled.div({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  h2: {
    color: "black",
  },
  span: {
    fontWeight: "bold",
    color: "#4e0eff",
  },
});

const ButtonContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
});

const Button = styled.button({
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#4e0eff",
  color: "white",
  "&:hover": {
    backgroundColor: "#9a7ceb",
  },
});

export default LogoutConfirmation;
