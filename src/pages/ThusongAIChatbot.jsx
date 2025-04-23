// src/pages/ThusongAIChatbot.jsx
import React, { useState } from 'react';
import './ThusongAIChatbot.css';

const ThusongAIChatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I assist you today?', sender: 'ai' },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    setMessages([...messages, { text: userInput, sender: 'user' }]);
    setUserInput('');

    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput);
      setMessages([...messages, { text: userInput, sender: 'user' }, { text: aiResponse, sender: 'ai' }]);
    }, 500);
  };

  const generateAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello! I am Thusong AI, your personal assistant.';
    } else if (lowerCaseMessage.includes('how are you')) {
      return 'I am doing well, thank you for asking!';
    } else if(lowerCaseMessage.includes('how do i pay bills?')){
      return 'Go to the dashboard page, on the left you will see pay bills now. Click on it and you will be able to pay your bills';
    } else {
      return 'I am not sure I understand. Can you rephrase your question?';
    }
  };

  return (
    <div className="thusong-chatbot-container">
      <div className="thusong-chatbot-header">
        <h1 className="thusong-chatbot-title">Thusong AI Chatbot</h1>
      </div>
      <div className="thusong-chatbot-body">
        <div className="thusong-chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`thusong-chat-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="thusong-chatbot-input">
        <input
          type="text"
          className="thusong-input-field"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button className="thusong-send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ThusongAIChatbot;
