import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChatBox() {
  const { roomId } = useParams();
  const query = useQuery();
  const name = query.get("name");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const apiEndpoint = import.meta.env.VITE_CHAT_APP_BACKEND_URL;

    socketRef.current = io(apiEndpoint);

    socketRef.current.emit("join room", { roomId, name });

    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    const handleUserJoined = (userName) => {
      toast.success(`${userName} has joined the chat`);
    };

    const handleUserLeft = (userName) => {
      toast.error(`${userName} has left the chat`);
    };

    socketRef.current.on("chat message", handleMessage);
    socketRef.current.on("user joined", handleUserJoined);
    socketRef.current.on("user left", handleUserLeft);

    return () => {
      socketRef.current.off("chat message", handleMessage);
      socketRef.current.off("user joined", handleUserJoined);
      socketRef.current.off("user left", handleUserLeft);
      socketRef.current.disconnect();
    };
  }, [roomId, name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const msg = {
        text: input,
        userId: socketRef.current.id,
        userName: name,
        roomId,
        timestamp: Date.now(),
      };
      socketRef.current.emit("chat message", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInput("");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors expand={true} />
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-900">
        <div className="w-full max-w-lg flex flex-col justify-between p-4 rounded-md shadow-md bg-gray-800">
          <div
            id="messages"
            className="flex flex-col h-[500px] p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800"
          >
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`${
                  msg.userId === socketRef.current.id
                    ? "bg-blue-900 self-end"
                    : "bg-gray-600 self-start"
                } p-2 rounded-md mb-2 max-w-xs break-words`}
              >
                <strong>{msg.userName}: </strong> {msg.text}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            id="form"
            onSubmit={handleSubmit}
            className="flex space-x-2 mt-4"
          >
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              placeholder="Type your message"
              className="flex-grow"
            />
            <Button variant="secondary" id="button" type="submit">
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
