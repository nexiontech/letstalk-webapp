import React, { useState } from 'react';
import './CommunityHub.css';

import circleIcon from '../assets/images/circle_icon.jpg';
import bubleIcon from '../assets/images/buble_icon.jpg';
import recordIcon from '../assets/images/record_icon.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faMapMarkerAlt, faChevronDown, faEllipsisV,
  faPaperclip, faImage, faPaperPlane, faPause, faPlus,
  faUserCircle, faUsers, faBolt, faWater, faComments,
  faBell, faCog, faSignOutAlt, faPhone, faVideo
} from '@fortawesome/free-solid-svg-icons';

function CommunityHub() {
  const [activeTab, setActiveTab] = useState('chats');
  const [activeChatId, setActiveChatId] = useState(3);

  const currentUserName = "Moepi Setona";
  const currentUserLocation = "Johannesburg";

  const chatGroups = [
    { id: 1, name: "Recent Chats", icon: faComments },
    { id: 2, name: "Community Groups", icon: faUsers },
    { id: 3, name: "Service Updates", icon: faBolt }
  ];

  const chats = [
    {
      id: 1,
      name: "Water Services",
      avatar: bubleIcon,
      isGroup: true,
      members: 24,
      online: 3,
      lastMessage: "The water outage in Alexandra has been resolved.",
      time: "10:45",
      unread: 2,
      category: "Service Updates"
    },
    {
      id: 2,
      name: "Electricity Updates",
      avatar: bubleIcon,
      isGroup: true,
      members: 56,
      online: 7,
      lastMessage: "Scheduled maintenance tonight from 22:00 to 04:00",
      time: "12:30",
      unread: 0,
      category: "Service Updates"
    },
    {
      id: 3,
      name: "Alexandra Community",
      avatar: bubleIcon,
      isGroup: true,
      members: 128,
      online: 15,
      lastMessage: "Meeting at the community center tomorrow at 18:00",
      time: "14:22",
      unread: 5,
      category: "Community Groups"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      avatar: bubleIcon,
      isGroup: false,
      lastMessage: "Thanks for the update on the water situation",
      time: "Yesterday",
      unread: 0,
      category: "Recent Chats"
    }
  ];

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      avatar: bubleIcon,
      content: "Hello everyone! I wanted to share some information about the upcoming community meeting.",
      time: "10:30",
      isOutgoing: false
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      avatar: bubleIcon,
      content: "Thanks for the heads up. Will there be a discussion about the recent water issues?",
      time: "10:35",
      isOutgoing: false
    },
    {
      id: 3,
      sender: currentUserName,
      avatar: circleIcon,
      content: "Yes, water services will be one of the main topics. We'll also discuss the new community garden project.",
      time: "10:40",
      isOutgoing: true
    },
    {
      id: 4,
      sender: "Water Services",
      avatar: bubleIcon,
      isFile: true,
      fileName: "Water_Schedule_July.pdf",
      fileSize: "1.2 MB",
      time: "11:15",
      isOutgoing: false
    },
    {
      id: 5,
      sender: currentUserName,
      avatar: circleIcon,
      content: "I've reviewed the schedule. The maintenance times look good, but we should notify residents at least 48 hours in advance.",
      time: "11:30",
      isOutgoing: true
    }
  ];

  return (
    <div className="hub-container">
      <div style={{ display: 'flex', width: '100%', minHeight: '600px' }}>
        <div className="hub-sidebar">
        <div className="hub-sidebar-header">
          <div className="hub-user-profile">
            <div className="hub-avatar">
              <img src={circleIcon} alt="User Avatar" />
            </div>
            <div className="hub-user-info">
              <h3>{currentUserName}</h3>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{currentUserLocation}</span>
              </p>
            </div>
          </div>
          <div className="hub-actions">
            <button className="hub-action-button">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="hub-action-button">
              <FontAwesomeIcon icon={faCog} />
            </button>
          </div>
        </div>

        <div className="hub-search">
          <FontAwesomeIcon icon={faSearch} className="hub-search-icon" />
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="hub-tabs">
          <button
            className={`hub-tab ${activeTab === 'chats' ? 'active' : ''}`}
            onClick={() => setActiveTab('chats')}
          >
            <FontAwesomeIcon icon={faComments} />
            <span>Chats</span>
          </button>
          <button
            className={`hub-tab ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Groups</span>
          </button>
          <button
            className={`hub-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FontAwesomeIcon icon={faBolt} />
            <span>Services</span>
          </button>
        </div>

        <div className="hub-groups">
          {chatGroups.map(group => (
            <div key={group.id} className="hub-group">
              <div className="hub-group-header">
                <FontAwesomeIcon icon={group.icon} />
                <h4>{group.name}</h4>
              </div>
              <div className="hub-chat-list">
                {chats
                  .filter(chat =>
                    (activeTab === 'chats') ||
                    (activeTab === 'groups' && chat.isGroup) ||
                    (activeTab === 'services' && chat.category === 'Service Updates')
                  )
                  .filter(chat => chat.category === group.name ||
                    (group.name === "Recent Chats" && activeTab === 'chats'))
                  .map(chat => (
                    <div
                      key={chat.id}
                      className={`hub-chat-item ${chat.id === activeChatId ? 'active' : ''}`}
                      onClick={() => setActiveChatId(chat.id)}
                    >
                      <div className="hub-chat-avatar">
                        <img src={chat.avatar} alt={chat.name} />
                        {chat.isGroup && (
                          <span className="hub-chat-members">
                            <FontAwesomeIcon icon={faUsers} />
                          </span>
                        )}
                      </div>
                      <div className="hub-chat-content">
                        <div className="hub-chat-header">
                          <h4>{chat.name}</h4>
                          <span className="hub-chat-time">{chat.time}</span>
                        </div>
                        <div className="hub-chat-message">
                          <p>{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="hub-chat-badge">{chat.unread}</span>
                          )}
                        </div>
                        {chat.isGroup && (
                          <div className="hub-chat-meta">
                            <span className="hub-chat-members-count">
                              {chat.members} members, {chat.online} online
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>

        <div className="hub-create-chat">
          <button>
            <FontAwesomeIcon icon={faPlus} />
            <span>New Conversation</span>
          </button>
        </div>
      </div>

      <div className="hub-main">
        {activeChat ? (
          <>
            <div className="hub-chat-header">
              <div className="hub-chat-info">
                <div className="hub-chat-avatar large">
                  <img src={activeChat.avatar} alt={activeChat.name} />
                  {activeChat.isGroup && (
                    <span className="hub-chat-status online"></span>
                  )}
                </div>
                <div>
                  <h2>{activeChat.name}</h2>
                  {activeChat.isGroup && (
                    <p>{activeChat.members} members, {activeChat.online} online</p>
                  )}
                </div>
              </div>
              <div className="hub-chat-actions">
                <button className="hub-action-button">
                  <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className="hub-action-button">
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className="hub-action-button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <button className="hub-action-button">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            </div>

            <div className="hub-chat-messages">
              <div className="hub-date-divider">
                <span>Today</span>
              </div>

              {messages.map(message => (
                <div
                  key={message.id}
                  className={`hub-message ${message.isOutgoing ? 'outgoing' : 'incoming'}`}
                >
                  {!message.isOutgoing && (
                    <div className="hub-message-avatar">
                      <img src={message.avatar} alt={message.sender} />
                    </div>
                  )}
                  <div className="hub-message-content">
                    {!message.isOutgoing && (
                      <div className="hub-message-sender">{message.sender}</div>
                    )}
                    {message.isFile ? (
                      <div className="hub-message-file">
                        <FontAwesomeIcon icon={faImage} className="hub-file-icon" />
                        <div className="hub-file-info">
                          <span className="hub-file-name">{message.fileName}</span>
                          <span className="hub-file-size">{message.fileSize}</span>
                        </div>
                        <button className="hub-file-download">
                          Download
                        </button>
                      </div>
                    ) : (
                      <div className="hub-message-text">{message.content}</div>
                    )}
                    <div className="hub-message-time">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hub-chat-input">
              <button className="hub-input-action">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <input type="text" placeholder="Type a message..." />
              <button className="hub-input-send">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </>
        ) : (
          <div className="hub-empty-state">
            <div className="hub-empty-icon">
              <FontAwesomeIcon icon={faComments} />
            </div>
            <h2>Select a conversation</h2>
            <p>Choose a chat from the sidebar to start messaging</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default CommunityHub;
