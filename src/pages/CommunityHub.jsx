import React from 'react';
import Container from '@mui/material/Container';
import './CommunityHub.css';

import circleIcon from '../assets/images/circle_icon.jpg';
import bubleIcon from '../assets/images/buble_icon.jpg';
import recordIcon from '../assets/images/record_icon.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faMapMarkerAlt, faChevronDown, faEllipsisV,
  faPaperclip, faImage, faPaperPlane, faPause,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

function CommunityHub() {
  const currentUserName = "User's Name";
  const currentUserLocation = "Johannesburg";
  const currentUserFullName = "Moepi Setona";
  const helloUserName = "Hello User";
  const helloUserEmail = "user@gmail.com";

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 4 }}>
      <div className="community-hub">
        <h1 className="community-hub__title">Community Hub</h1>

        <main className="community-hub__content">
          <div className="user-profile-block">
            <div style={{ height: '20px' }}></div>
            <div className="user-card">
              <img src={circleIcon} alt="Circle Graphic" className="user-card__graphic" />
              <div className="user-card__info">
                <div style={{ height: '100px' }}></div>
                <p className="user-card__name">{helloUserName}</p>
                <p className="user-card__email">{helloUserEmail}</p>
              </div>
            </div>

            <div className="search-bar">
              <input type="text" placeholder="Search in Messages" className="search-bar__input" />
            </div>
          </div>

          <aside className="chat-list-sidebar">
            <div className="chat-list-item">
              <div className="chat-list-item__left">
                <div className="chat-list-item__avatar-container">
                  <img src={bubleIcon} alt="Avatar" className="chat-list-item__avatar" />
                  <span className="chat-list-item__status-indicator"></span>
                </div>
                <div className="chat-list-item__details">
                  <p className="chat-list-item__name">User 1</p>
                  <p className="chat-list-item__preview">Example text example</p>
                </div>
              </div>
              <p className="chat-list-item__timestamp">12:45</p>
            </div>

            <div className="chat-list-item">
              <div className="chat-list-item__left">
                <div className="chat-list-item__avatar-stack">
                  <img src={bubleIcon} alt="Avatar" className="chat-list-item__avatar chat-list-item__avatar--stacked" />
                  <img src={bubleIcon} alt="Avatar" className="chat-list-item__avatar chat-list-item__avatar--stacked" />
                </div>
                <div className="chat-list-item__details">
                  <p className="chat-list-item__name">Water Outage Group</p>
                  <p className="chat-list-item__preview">
                    <span className="online-status">2 Online</span> Meeting soon?
                  </p>
                </div>
              </div>
              <p className="chat-list-item__timestamp">12:45</p>
            </div>

            <div className="chat-list-item chat-list-item--active">
              <div className="chat-list-item__left">
                <div className="chat-list-item__avatar-container">
                  <img src={bubleIcon} alt="Avatar" className="chat-list-item__avatar" />
                  <span className="chat-list-item__status-indicator"></span>
                </div>
                <div className="chat-list-item__details">
                  <p className="chat-list-item__name">MR A</p>
                  <p className="chat-list-item__preview chat-list-item__preview--active">Example Text</p>
                </div>
              </div>
              <p className="chat-list-item__timestamp chat-list-item__timestamp--active">12:45</p>
            </div>

            <div className="chat-list-item">
              <div className="chat-list-item__left">
                <div className="chat-list-item__avatar-container">
                  <img src={bubleIcon} alt="Avatar" className="chat-list-item__avatar" />
                  <span className="chat-list-item__status-indicator"></span>
                </div>
                <div className="chat-list-item__details">
                  <p className="chat-list-item__name">Electricity Outages</p>
                  <p className="chat-list-item__preview">Outage In My Area</p>
                </div>
              </div>
              <p className="chat-list-item__timestamp">12:45</p>
            </div>
          </aside>

          <section className="chat-window">
            <header className="chat-window__header">
              <div className="chat-window__header-status">
                <span className="chat-window__header-status-dot"></span>
                <p className="chat-window__header-user">{currentUserName}</p>
              </div>
              <div className="chat-window__header-actions">
                <div className="chat-window__header-search">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <span>Search...</span>
                </div>
                <div className="chat-window__header-location">
                  <span>{currentUserLocation}</span>
                  <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
                </div>
                <div className="chat-window__header-user-info">
                  <FontAwesomeIcon icon={faUserCircle} className="chat-window__header-user-icon" />
                  <span>{currentUserFullName}</span>
                </div>
                <button className="chat-window__header-options-btn">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            </header>

            <div className="chat-window__messages">
              <div className="message-bubble message-bubble--incoming">
                <img src={bubleIcon} alt="Avatar C" className="message-bubble__avatar" />
                <div className="message-bubble__content">
                  <p className="message-bubble__sender">MR C</p>
                  <div className="message-bubble__file-info">
                    <p className="message-bubble__file-name">Power Outage Schedule.pdf</p>
                    <p className="message-bubble__file-size">760.90 KB</p>
                  </div>
                  <div className="message-bubble__download-status">
                    <p className="message-bubble__download-text">Downloading…</p>
                  </div>
                  <span className="message-bubble__timestamp">12:45</span>
                </div>
              </div>

              <div className="message-bubble message-bubble--outgoing message-bubble--image">
                <div className="message-bubble__content">
                  <p className="message-bubble__sender">MR B</p>
                  <div className="message-bubble__image-gallery">
                    <div className="message-bubble__image-placeholder">
                      <FontAwesomeIcon icon={faImage} className="icon" />
                    </div>
                    <div className="message-bubble__image-placeholder">
                      <FontAwesomeIcon icon={faImage} className="icon" />
                    </div>
                  </div>
                  <span className="message-bubble__timestamp">12:45</span>
                </div>
                <img src={bubleIcon} alt="Avatar B" className="message-bubble__avatar" />
              </div>

              <div className="message-bubble message-bubble--incoming">
                <img src={bubleIcon} alt="Avatar A" className="message-bubble__avatar" />
                <div className="message-bubble__content">
                  <p className="message-bubble__sender">MR A</p>
                  <div className="message-bubble__audio-player">
                    <button className="message-bubble__audio-button">
                      <FontAwesomeIcon icon={faPause} />
                    </button>
                    <img src={recordIcon} alt="Audio Waveform" className="message-bubble__audio-waveform" />
                  </div>
                  <span className="message-bubble__timestamp">12:45</span>
                </div>
              </div>

              <div className="message-bubble message-bubble--outgoing">
                <div className="message-bubble__content">
                  <p className="message-bubble__sender">MR B</p>
                  <p
                    className="message-bubble__text"
                    dangerouslySetInnerHTML={{ __html: 'Example Text<br /> Example Text<br /> Example Text<br /> Example Text<br /> Example Text<br /> Example Text' }}
                  />
                  <span className="message-bubble__timestamp">12:45</span>
                </div>
                <img src={bubleIcon} alt="Avatar B" className="message-bubble__avatar" />
              </div>
            </div>

            <footer className="chat-window__input-area">
              <div className="chat-window__input-wrapper">
                <button className="chat-window__attach-button">
                  <FontAwesomeIcon icon={faPaperclip} />
                </button>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </Container>
  );
}

export default CommunityHub;
