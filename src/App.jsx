import { useState, useEffect } from "react";
import "./App.css";
import socket from "./server";

function App() {
    const [messages, setMessages] = useState(["안녕하세요~", "네 안녕하세요"]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on("chat message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("chat message");
        };
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            socket.emit("chat message", input);
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
            </div>
            <ul className="chat-messages">
                {messages.map((message, index) => (
                    <li key={index} className="message">
                        <div className="message-content">
                            <p>{message}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default App;
