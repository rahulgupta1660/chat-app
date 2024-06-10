import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
