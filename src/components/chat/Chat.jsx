import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT = "https://chatapp-api-gst5.onrender.com";

const Chat = () => {
  const location = useLocation();
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get("name");
    const room = searchParams.get("room");

    setUser(user);
    setRoom(room);

    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("join", { user, room });

    socket.on("welcome", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("userJoined", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("sendMessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.emit("userdisconnect");
      socket.off();
    };
  }, [location.search]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, room });
    document.getElementById("chatInput").value = "";
  };

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>chat app</h2>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.user}
              message={item.message}
              classs={item.user === user ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
