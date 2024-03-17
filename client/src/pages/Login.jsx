import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRouters";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          ("chat-app-user"),
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  alignItems: "center",
  backgroundColor: "#131324",
  ".brand": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    justifyContent: "center",
    img: {
      height: "5rem",
    },
    h1: {
      color: "white",
      textTransform: "uppercase",
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    backgroundColor: "#00000076",
    borderRadius: "2rem",
    padding: "5rem",
  },
  input: {
    backgroundColor: "transparent",
    padding: "1rem",
    border: "0.1rem solid #4e0eff",
    borderRadius: "0.4rem",
    color: "white",
    width: "100%",
    fontSize: "1rem",
    "&:focus": {
      border: "0.1rem solid #997af0",
      outline: "none",
    },
  },
  button: {
    backgroundColor: "#4e0eff",
    color: "white",
    padding: "1rem 2rem",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0.4rem",
    fontSize: "1rem",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#4e0eff",
    },
  },
  span: {
    color: "white",
    textTransform: "uppercase",
    a: {
      color: "#4e0eff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  },
});
