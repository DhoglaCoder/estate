import React, { useState, useEffect } from "react";
import "./ChatsComp.css";
import { db } from "../Firebase/firebase";
import { collection, query, onSnapshot, orderBy, addDoc } from "firebase/firestore";

export default function ChatsComp() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const loggedInUserId = localStorage.getItem("uid");

    useEffect(() => {
        if (!loggedInUserId) return;

        const q = query(collection(db, "chats"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatList = snapshot.docs
                .map((doc) => {
                    const chatData = { id: doc.id, ...doc.data() };
                    const participants = chatData.users || [];
                    const isParticipant = participants.some(user => user.id === loggedInUserId);
                    if (!isParticipant) return null;

                    const otherUser = participants.find(user => user.id !== loggedInUserId);
                    return {
                        ...chatData,
                        chatName: otherUser ? otherUser.name : "Unknown Chat",
                    };
                })
                .filter(chat => chat !== null);
            setChats(chatList);
        });

        return () => unsubscribe();
    }, [loggedInUserId]);

    useEffect(() => {
        if (!selectedChat) return;

        const messagesRef = collection(db, "chats", selectedChat.id, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messageList = snapshot.docs.map((doc) => doc.data());
            setMessages(messageList);
        });

        return () => unsubscribe();
    }, [selectedChat]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = async (messageText) => {
        if (!messageText) return;

        const message = {
            text: messageText,
            timestamp: new Date(),
            sender: loggedInUserId,
        };

        const messagesRef = collection(db, "chats", selectedChat.id, "messages");
        await addDoc(messagesRef, message);
    };

    return (
        <div className="app-wrapper">
            <div className="chat-container-wrapper">
                <div className="chat-sidebar">
                    <div className="sidebar-header">
                        <h3>Chats</h3>
                    </div>
                    <div className="chat-list">
                        {chats.length > 0 ? (
                            chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
                                    onClick={() => handleChatSelect(chat)}
                                >
                                    <div className="chat-details">
                                        <h4>{chat.chatName}</h4>
                                        <p>{chat.lastMessage?.text || "No messages yet"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No chats available</p>
                        )}
                    </div>
                </div>
                <div className="chat-main">
                    {selectedChat ? (
                        <div className="chat-box">
                            <div className="chat-header">
                                <h4>{selectedChat.chatName}</h4>
                            </div>
                            <div className="chat-messages">
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message-bubble ${message.sender === loggedInUserId ? "right" : "left"}`}
                                        >
                                            <p>{message.text}</p>
                                            <span className="message-time">
                                                {message.timestamp?.seconds ? 
                                                    new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                                    : ""}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No messages </p>
                                )}
                            </div>
                            <div className="chat-input">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSendMessage(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                                <button onClick={() => handleSendMessage(document.querySelector("input").value)}>
                                    Send
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-placeholder">
                            <p>Select a chat to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
