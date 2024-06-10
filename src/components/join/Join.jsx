import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <h1>chat app</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <input
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter Room Name"
          type="text"
          id="roomInput"
        />
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="joinbtn">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
