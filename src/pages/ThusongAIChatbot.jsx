// src/pages/ThusongAIChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser, faSpinner, faTimes, faComments } from '@fortawesome/free-solid-svg-icons';
import './ThusongAIChatbot.css';

const ThusongAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Hi there! I\'m Thusong AI, your virtual assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample suggested questions
  const suggestedQuestions = [
    "How do I pay my bills?",
    "Where can I find service updates?",
    "How do I report an issue?",
    "What documents do I need for ID application?"
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newUserMessage = {
      text: userInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput);
      const newAiMessage = {
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prevMessages => [...prevMessages, newAiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestedQuestion = (question) => {
    setUserInput(question);
    // Focus on input after selecting a question
    document.querySelector('.thusong-input-field').focus();
  };

  const generateAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // More comprehensive responses
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello! I am Thusong AI, your personal assistant. I can help you with government services, bill payments, and community information. How may I assist you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
      return 'I am functioning well, thank you for asking! I\'m here to help you with any questions about government services. What can I assist you with today?';
    } else if (lowerCaseMessage.includes('pay bills') || lowerCaseMessage.includes('payment')) {
      return 'To pay your bills, navigate to the Dashboard page. On the left sidebar, you\'ll see a "Pay Bills Now" button. Click on it to access our secure payment portal where you can pay for electricity, water, rates, and other municipal services. You can use credit/debit cards, EFT, or instant payment methods.';
    } else if (lowerCaseMessage.includes('service updates') || lowerCaseMessage.includes('outage')) {
      return 'For service updates, check the Community Hub page where all current service notifications are posted. You can also subscribe to SMS alerts for your area by going to your profile settings and enabling notifications for your location.';
    } else if (lowerCaseMessage.includes('report') || lowerCaseMessage.includes('issue')) {
      return 'To report an issue, go to the Dashboard and click on "Report an Issue". You can submit details about water leaks, power outages, road damage, or other municipal problems. Include your location and photos if possible for faster resolution.';
    } else if (lowerCaseMessage.includes('id') || lowerCaseMessage.includes('document')) {
      return 'For ID applications, you\'ll need: (1) Birth certificate, (2) Proof of residence, (3) Two recent passport photos, and (4) Completed application form DHA-9. Visit the Government Services page for more details and to book an appointment.';
    } else {
      return 'I\'m not sure I understand your question. Could you please rephrase it or select one of the suggested topics below? I\'m here to help with government services, bill payments, and community information.';
    }
  };

  const toggleMinimize = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <div className={`thusong-chatbot-container ${isChatMinimized ? 'minimized' : ''}`}>
      <div className="thusong-chatbot-header">
        <div className="thusong-chatbot-header-content">
          <FontAwesomeIcon icon={faRobot} className="thusong-chatbot-icon" />
          <h1 className="thusong-chatbot-title">Thusong AI Assistant</h1>
        </div>
        <button
          className="thusong-minimize-button"
          onClick={toggleMinimize}
          aria-label={isChatMinimized ? "Expand chat" : "Minimize chat"}
        >
          <FontAwesomeIcon icon={isChatMinimized ? faComments : faTimes} />
        </button>
      </div>

      {!isChatMinimized && (
        <>
          <div className="thusong-chatbot-body">
            <div className="thusong-chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`thusong-chat-message ${message.sender}`}
                >
                  <div className="thusong-message-avatar">
                    <FontAwesomeIcon
                      icon={message.sender === 'ai' ? faRobot : faUser}
                      className={`avatar-icon ${message.sender}`}
                    />
                  </div>
                  <div className="thusong-message-content">
                    <div className="thusong-message-text">{message.text}</div>
                    <div className="thusong-message-time">{message.timestamp}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="thusong-chat-message ai typing">
                  <div className="thusong-message-avatar">
                    <FontAwesomeIcon icon={faRobot} className="avatar-icon ai" />
                  </div>
                  <div className="thusong-message-content">
                    <div className="thusong-typing-indicator">
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span>Thusong AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="thusong-suggested-questions">
            <p className="thusong-suggested-title">Suggested questions:</p>
            <div className="thusong-question-chips">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="thusong-question-chip"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </button>
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
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="thusong-send-button"
              onClick={handleSendMessage}
              disabled={isTyping || userInput.trim() === ''}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThusongAIChatbot;
