import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

function ChatApp() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlRoomId = searchParams.get("roomId");
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, [location.search]);

  const handleCreateRoom = () => {
    if (!name.trim()) {
      setErrorMessage("Name is required to create a room.");
      return;
    }
    const newRoomId = Math.random().toString(36).substring(2, 10);
    navigate(`/chat/${newRoomId}?name=${encodeURIComponent(name)}`);
  };

  const handleJoinRoom = () => {
    if (!name.trim()) {
      setErrorMessage("Name is required to join a room.");
      return;
    }
    if (roomId.trim()) {
      setErrorMessage("");
      navigate(`/chat/${roomId.trim()}?name=${encodeURIComponent(name)}`);
    } else {
      setErrorMessage(
        "Room ID cannot be empty while joining a room. Please enter a Room ID."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Chat App!</h2>
        <div className="input">
          <label
            htmlFor="name"
            className="block text-md font-medium text-gray-500"
          >
            Enter your name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="input">
          <label
            htmlFor="roomId"
            className="block text-md font-medium text-gray-500"
          >
            Enter room ID
          </label>
          <Input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="i50s2d7n"
            disabled={Boolean(roomId)}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <div className="flex gap-4">
          <button
            onClick={handleCreateRoom}
            className="w-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
          >
            Create a New Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="w-1/2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
