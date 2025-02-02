import React, { useState, useEffect } from "react";
import "./ChatsComp.css";
import { db } from "../Firebase/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

export default function ChatsComp() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const loggedInUserId = localStorage.getItem("uid"); // Fetching the logged-in user's UID

    useEffect(() => {
        if (!loggedInUserId) return;

        // Query Firestore to get all chats where the logged-in user is a participant
        const q = query(
            collection(db, "chats"),
            where("users", "array-contains", loggedInUserId),
            orderBy("lastMessage.timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChats(chatList);
        });

        return () => unsubscribe();
    }, [loggedInUserId]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="app-wrapper">
            <div className="chat-container-wrapper">
                <div className="chat-sidebar">
                    <div className="sidebar-header">
                        <h3>Chats</h3>
                    </div>
                    <div className="chat-list">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
                                onClick={() => handleChatSelect(chat)}
                            >
                                <div className="chat-details">
                                    <h4>{chat.chatName || "Chat"}</h4>
                                    <p>{chat.lastMessage?.text || "No messages yet"}</p>
                                </div>
                                <div className="chat-time">
                                    {chat.lastMessage?.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-main">
                    {selectedChat ? (
                        <div className="chat-box">
                            <div className="chat-header">
                                <h4>{selectedChat.chatName || "Chat"}</h4>
                            </div>
                            <div className="chat-messages">
                                <p>Start chatting with {selectedChat.chatName || "your contact"}!</p>
                            </div>
                            <div className="chat-input">
                                <input type="text" placeholder="Type a message..." />
                                <button>Send</button>
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
