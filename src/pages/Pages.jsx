import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import Register from "./Register";
function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default Pages;
