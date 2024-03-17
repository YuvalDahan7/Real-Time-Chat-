import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)} >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div({
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "5% 95%",
  backgroundColor: "#080420",
  padding: "0 2rem",
  "@media screen and (min-width: 720px) and (max-width: 1080px)": {
    padding: "0 1rem",
    gap: "1rem",
  },
  ".button-container": {
    display: "flex",
    alignItems: "center",
    color: "white",
    gap: "1rem",
    ".emoji": {
      position: "relative",
      svg: {
        fontSize: "1.5rem",
        color: "#ffff00c8",
        cursor: "pointer",
      },
      ".emoji-picker-react": {
        position: "absolute",
        top: "600px",
        backgroundColor: "#080420",
        boxShadow: "0 5px 10px #9a86f3",
        borderColor: "#9a86f3",
        "& .emoji-scroll-wrapper::-webkit-scrollbar": {
          backgroundColor: "#080420",
          width: "5px",
          "&-thumb": {
            backgroundColor: "#9a86f3",
          },
        },
        "& .emoji-categories button": {
          filter: "contrast(0)",
        },
        "& .emoji-search": {
          backgroundColor: "transparent",
          borderColor: "#9a86f3",
        },
        "& .emoji-group::before": {
          backgroundColor: "#080420",
        },
      },
    },
  },
  ".input-container": {
    width: "100%",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    backgroundColor: "#ffffff34",
    "& input": {
      width: "90%",
      height: "60%",
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      paddingLeft: "1rem",
      fontSize: "1.2rem",
      "&::selection": {
        backgroundColor: "#9a86f3",
      },
      "&:focus": {
        outline: "none",
      },
    },
    "& button": {
      padding: "0.3rem 2rem",
      borderRadius: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#9a86f3",
      border: "none",
      "@media screen and (min-width: 720px) and (max-width: 1080px)": {
        padding: "0.3rem 1rem",
        "& svg": {
          fontSize: "1rem",
        },
      },
      "& svg": {
        fontSize: "2rem",
        color: "white",
      },
    },
  },
});

export default ChatInput