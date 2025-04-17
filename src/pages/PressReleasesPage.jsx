import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faCalendarAlt, faPlayCircle, 
  faNewspaper, faVideo, faBuilding, faPeopleGroup,
  faMapMarkerAlt, faChevronRight, faDownload, faShare,
  faBookmark, faEye, faClock, faTag, faStream, faBell
} from '@fortawesome/free-solid-svg-icons';
import './PressReleasesPage.css';

const PressReleasesPage = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Sample data for news releases
  const newsReleases = [
    {
      id: 1,
      title: "Water Infrastructure Upgrade Project Announced",
      summary: "The municipality has approved a R50 million project to upgrade water infrastructure in Alexandra and surrounding areas.",
      date: "June 15, 2023",
      category: "Water Services",
      source: "Department of Water and Sanitation",
      image: "https://via.placeholder.com/300x200?text=Water+Infrastructure",
      content: `
        <p>The Department of Water and Sanitation has announced a major infrastructure upgrade project aimed at improving water supply reliability in Alexandra and surrounding areas.</p>
        <p>The R50 million project will include:</p>
        <ul>
          <li>Replacement of aging water pipes</li>
          <li>Installation of new water meters</li>
          <li>Construction of additional water storage facilities</li>
          <li>Implementation of smart water management systems</li>
        </ul>
        <p>"This investment represents our commitment to ensuring reliable water access for all residents," said the Minister of Water and Sanitation. "The project is expected to reduce water losses by up to 30% and significantly improve service delivery."</p>
        <p>Construction is scheduled to begin next month and will be completed in phases over the next 18 months. Residents may experience temporary water interruptions during the upgrade process, but these will be announced in advance.</p>
      `
    },
    {
      id: 2,
      title: "New Electricity Tariff Structure Effective July 1",
      summary: "The National Energy Regulator has approved a new electricity tariff structure that will take effect from July 1.",
      date: "May 28, 2023",
      category: "Electricity",
      source: "National Energy Regulator",
      image: "https://via.placeholder.com/300x200?text=Electricity+Tariffs",
      content: `
        <p>The National Energy Regulator has approved a new electricity tariff structure that aims to make electricity more affordable for low-income households while encouraging energy conservation.</p>
        <p>Key changes include:</p>
        <ul>
          <li>Introduction of a three-tier pricing system based on consumption</li>
          <li>Reduced rates for the first 350 kWh for residential users</li>
          <li>Higher rates for consumption above 600 kWh</li>
          <li>Special provisions for registered low-income households</li>
        </ul>
        <p>"The new tariff structure is designed to be more equitable and to promote energy efficiency," said the Chairperson of the National Energy Regulator. "We believe this approach will help manage demand while protecting vulnerable households."</p>
        <p>Residents are encouraged to register for the low-income subsidy program if they qualify. Registration can be completed at local municipal offices or online through the official website.</p>
      `
    },
    {
      id: 3,
      title: "Waste Management Improvement Plan Launched",
      summary: "A comprehensive waste management improvement plan has been launched to address refuse collection challenges.",
      date: "April 10, 2023",
      category: "Waste Management",
      source: "Department of Environmental Affairs",
      image: "https://via.placeholder.com/300x200?text=Waste+Management",
      content: `
        <p>The Department of Environmental Affairs has launched a comprehensive waste management improvement plan to address ongoing challenges with refuse collection and disposal.</p>
        <p>The initiative includes:</p>
        <ul>
          <li>Acquisition of 20 new waste collection vehicles</li>
          <li>Implementation of a revised collection schedule</li>
          <li>Development of two new waste transfer stations</li>
          <li>Introduction of a community recycling incentive program</li>
        </ul>
        <p>"We recognize the frustrations residents have experienced with inconsistent waste collection," said the Director of Environmental Affairs. "This plan represents a holistic approach to resolving these issues and improving service delivery."</p>
        <p>The new collection schedule will be distributed to all households in the coming weeks. Residents are encouraged to participate in the recycling program, which will offer rewards for community participation.</p>
      `
    },
    {
      id: 4,
      title: "Road Maintenance Program to Begin Next Month",
      summary: "A major road maintenance program will begin next month, focusing on pothole repairs and resurfacing of major routes.",
      date: "March 5, 2023",
      category: "Roads and Transport",
      source: "Department of Transport",
      image: "https://via.placeholder.com/300x200?text=Road+Maintenance",
      content: `
        <p>The Department of Transport has announced a major road maintenance program that will begin next month, focusing on pothole repairs and resurfacing of major routes throughout the municipality.</p>
        <p>The program will include:</p>
        <ul>
          <li>Repair of over 5,000 potholes across the region</li>
          <li>Resurfacing of 120km of major roads</li>
          <li>Upgrade of drainage systems to prevent future road damage</li>
          <li>Installation of new road signs and markings</li>
        </ul>
        <p>"Our roads have suffered significant deterioration due to recent heavy rains," said the Head of Road Infrastructure. "This program will not only address current issues but also implement preventative measures to improve road longevity."</p>
        <p>Work will be conducted primarily during off-peak hours to minimize traffic disruption. Detailed schedules for specific areas will be published weekly on the municipal website and through local media.</p>
      `
    }
  ];
  
  // Sample data for live and recorded meetings
  const meetings = [
    {
      id: 1,
      title: "Parliamentary Session: Service Delivery Oversight",
      type: "Parliament",
      status: "Live",
      date: "Today, 10:00 AM",
      duration: "2 hours",
      viewers: 1245,
      thumbnail: "https://via.placeholder.com/300x200?text=Parliament+Session",
      description: "Live parliamentary session discussing oversight mechanisms for service delivery improvement across municipalities.",
      videoUrl: "#",
      downloadable: false
    },
    {
      id: 2,
      title: "Municipal Budget Allocation Meeting",
      type: "Municipality",
      status: "Recorded",
      date: "June 10, 2023",
      duration: "1 hour 45 minutes",
      viewers: 876,
      thumbnail: "https://via.placeholder.com/300x200?text=Budget+Meeting",
      description: "Discussion of the annual budget allocation for service delivery projects in the Johannesburg metropolitan area.",
      videoUrl: "#",
      downloadable: true
    },
    {
      id: 3,
      title: "Alexandra Ward 105 Community Forum",
      type: "Ward",
      status: "Scheduled",
      date: "June 20, 2023, 14:00 PM",
      duration: "Expected 2 hours",
      viewers: 0,
      thumbnail: "https://via.placeholder.com/300x200?text=Ward+Meeting",
      description: "Upcoming ward meeting to address local service delivery concerns and community development initiatives.",
      videoUrl: "#",
      downloadable: false
    },
    {
      id: 4,
      title: "Water Crisis Response Task Force",
      type: "Municipality",
      status: "Recorded",
      date: "May 15, 2023",
      duration: "2 hours 30 minutes",
      viewers: 1532,
      thumbnail: "https://via.placeholder.com/300x200?text=Water+Crisis+Meeting",
      description: "Special municipal meeting convened to address the ongoing water supply challenges in several regions.",
      videoUrl: "#",
      downloadable: true
    },
    {
      id: 5,
      title: "Parliamentary Committee on Public Works",
      type: "Parliament",
      status: "Recorded",
      date: "April 28, 2023",
      duration: "3 hours 15 minutes",
      viewers: 945,
      thumbnail: "https://via.placeholder.com/300x200?text=Public+Works+Committee",
      description: "Committee meeting focused on infrastructure development and maintenance standards for public facilities.",
      videoUrl: "#",
      downloadable: true
    }
  ];
  
  const filteredNews = newsReleases.filter(item => {
    // Filter by search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (activeFilter !== 'all' && item.category.toLowerCase() !== activeFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });
  
  const filteredMeetings = meetings.filter(item => {
    // Filter by search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (activeFilter !== 'all' && item.type.toLowerCase() !== activeFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveFilter('all');
    setSelectedItem(null);
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return '#e74c3c';
      case 'Recorded': return '#3498db';
      case 'Scheduled': return '#2ecc71';
      default: return '#95a5a6';
    }
  };
  
  const renderNewsFilters = () => (
    <div className="press-filters">
      <button 
        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => handleFilterChange('all')}
      >
        All
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'Water Services' ? 'active' : ''}`}
        onClick={() => handleFilterChange('Water Services')}
      >
        Water Services
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'Electricity' ? 'active' : ''}`}
        onClick={() => handleFilterChange('Electricity')}
      >
        Electricity
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'Waste Management' ? 'active' : ''}`}
        onClick={() => handleFilterChange('Waste Management')}
      >
        Waste Management
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'Roads and Transport' ? 'active' : ''}`}
        onClick={() => handleFilterChange('Roads and Transport')}
      >
        Roads & Transport
      </button>
    </div>
  );
  
  const renderMeetingFilters = () => (
    <div className="press-filters">
      <button 
        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => handleFilterChange('all')}
      >
        All
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'parliament' ? 'active' : ''}`}
        onClick={() => handleFilterChange('parliament')}
      >
        Parliament
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'municipality' ? 'active' : ''}`}
        onClick={() => handleFilterChange('municipality')}
      >
        Municipality
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'ward' ? 'active' : ''}`}
        onClick={() => handleFilterChange('ward')}
      >
        Ward
      </button>
      <button 
        className={`filter-btn ${activeFilter === 'live' ? 'active' : ''}`}
        onClick={() => handleFilterChange('live')}
      >
        Live Now
      </button>
    </div>
  );
  
  const renderNewsList = () => (
    <div className="press-list">
      {filteredNews.length > 0 ? (
        filteredNews.map(item => (
          <div 
            key={item.id} 
            className={`press-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
            onClick={() => handleItemSelect(item)}
          >
            <div className="press-card-image">
              <img src={item.image} alt={item.title} />
              <div className="press-card-category">{item.category}</div>
            </div>
            <div className="press-card-content">
              <h3>{item.title}</h3>
              <p className="press-card-summary">{item.summary}</p>
              <div className="press-card-meta">
                <div className="press-meta-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{item.date}</span>
                </div>
                <div className="press-meta-item">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>{item.source}</span>
                </div>
              </div>
            </div>
            <div className="press-card-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        ))
      ) : (
        <div className="press-empty">
          <FontAwesomeIcon icon={faNewspaper} className="empty-icon" />
          <p>No news releases match your search criteria</p>
        </div>
      )}
    </div>
  );
  
  const renderMeetingsList = () => (
    <div className="press-list">
      {filteredMeetings.length > 0 ? (
        filteredMeetings.map(item => (
          <div 
            key={item.id} 
            className={`press-card meeting-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
            onClick={() => handleItemSelect(item)}
          >
            <div className="press-card-image">
              <img src={item.thumbnail} alt={item.title} />
              <div 
                className="meeting-status"
                style={{ backgroundColor: getStatusColor(item.status) }}
              >
                {item.status}
              </div>
              {item.status === 'Live' && (
                <div className="live-indicator">
                  <span className="live-dot"></span>
                  LIVE
                </div>
              )}
            </div>
            <div className="press-card-content">
              <div className="meeting-type">
                <FontAwesomeIcon 
                  icon={item.type === 'Parliament' ? faBuilding : 
                        item.type === 'Municipality' ? faBuilding : 
                        faPeopleGroup} 
                />
                <span>{item.type}</span>
              </div>
              <h3>{item.title}</h3>
              <div className="press-card-meta">
                <div className="press-meta-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{item.date}</span>
                </div>
                <div className="press-meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{item.duration}</span>
                </div>
                {item.status !== 'Scheduled' && (
                  <div className="press-meta-item">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{item.viewers.toLocaleString()} viewers</span>
                  </div>
                )}
              </div>
            </div>
            <div className="press-card-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        ))
      ) : (
        <div className="press-empty">
          <FontAwesomeIcon icon={faVideo} className="empty-icon" />
          <p>No meetings match your search criteria</p>
        </div>
      )}
    </div>
  );
  
  const renderNewsDetail = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="press-detail">
        <div className="press-detail-header">
          <div className="detail-category">
            <FontAwesomeIcon icon={faTag} />
            <span>{selectedItem.category}</span>
          </div>
          <h2>{selectedItem.title}</h2>
          <div className="detail-meta">
            <div className="detail-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>{selectedItem.date}</span>
            </div>
            <div className="detail-meta-item">
              <FontAwesomeIcon icon={faBuilding} />
              <span>{selectedItem.source}</span>
            </div>
          </div>
        </div>
        
        <div className="press-detail-image">
          <img src={selectedItem.image} alt={selectedItem.title} />
        </div>
        
        <div className="press-detail-content">
          <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
        </div>
        
        <div className="press-detail-actions">
          <button className="action-button">
            <FontAwesomeIcon icon={faShare} />
            <span>Share</span>
          </button>
          <button className="action-button">
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save</span>
          </button>
        </div>
      </div>
    );
  };
  
  const renderMeetingDetail = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="press-detail">
        <div className="press-detail-header">
          <div 
            className="meeting-status-large"
            style={{ backgroundColor: getStatusColor(selectedItem.status) }}
          >
            {selectedItem.status}
          </div>
          <h2>{selectedItem.title}</h2>
          <div className="detail-meta">
            <div className="detail-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>{selectedItem.date}</span>
            </div>
            <div className="detail-meta-item">
              <FontAwesomeIcon icon={faClock} />
              <span>{selectedItem.duration}</span>
            </div>
            <div className="detail-meta-item">
              <FontAwesomeIcon 
                icon={selectedItem.type === 'Parliament' ? faBuilding : 
                      selectedItem.type === 'Municipality' ? faBuilding : 
                      faPeopleGroup} 
              />
              <span>{selectedItem.type}</span>
            </div>
          </div>
        </div>
        
        <div className="video-container">
          {selectedItem.status === 'Live' || selectedItem.status === 'Recorded' ? (
            <div className="video-player">
              <div className="video-placeholder">
                <FontAwesomeIcon icon={faPlayCircle} />
                <span>{selectedItem.status === 'Live' ? 'Watch Live Stream' : 'Play Recording'}</span>
              </div>
            </div>
          ) : (
            <div className="scheduled-meeting">
              <div className="scheduled-info">
                <FontAwesomeIcon icon={faCalendarAlt} className="scheduled-icon" />
                <div>
                  <h3>Scheduled Meeting</h3>
                  <p>This meeting is scheduled for {selectedItem.date}</p>
                  <button className="reminder-button">
                    <FontAwesomeIcon icon={faBell} />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="meeting-description">
          <h3>About this meeting</h3>
          <p>{selectedItem.description}</p>
        </div>
        
        <div className="press-detail-actions">
          {selectedItem.downloadable && (
            <button className="action-button">
              <FontAwesomeIcon icon={faDownload} />
              <span>Download</span>
            </button>
          )}
          <button className="action-button">
            <FontAwesomeIcon icon={faShare} />
            <span>Share</span>
          </button>
          <button className="action-button">
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="press-container">
      <div className="press-header">
        <div className="press-title-section">
          <h1>Press & Media Center</h1>
          <p>Stay informed about service delivery news and government proceedings</p>
        </div>
        
        <div className="press-actions">
          <div className="press-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search news and meetings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="press-tabs">
        <button 
          className={`press-tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => handleTabChange('news')}
        >
          <FontAwesomeIcon icon={faNewspaper} />
          <span>News & Press Releases</span>
        </button>
        <button 
          className={`press-tab ${activeTab === 'meetings' ? 'active' : ''}`}
          onClick={() => handleTabChange('meetings')}
        >
          <FontAwesomeIcon icon={faVideo} />
          <span>Live & Recorded Meetings</span>
        </button>
      </div>
      
      <div className="press-content">
        <div className="press-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <FontAwesomeIcon icon={faFilter} />
              <h3>Filters</h3>
            </div>
            
            {activeTab === 'news' ? renderNewsFilters() : renderMeetingFilters()}
          </div>
          
          <div className="press-items-container">
            <h3 className="list-title">
              {activeTab === 'news' ? (
                <>
                  <FontAwesomeIcon icon={faNewspaper} />
                  <span>Press Releases</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faStream} />
                  <span>Meetings</span>
                </>
              )}
              <span className="item-count">
                {activeTab === 'news' ? filteredNews.length : filteredMeetings.length}
              </span>
            </h3>
            
            {activeTab === 'news' ? renderNewsList() : renderMeetingsList()}
          </div>
        </div>
        
        <div className="press-main">
          {selectedItem ? (
            activeTab === 'news' ? renderNewsDetail() : renderMeetingDetail()
          ) : (
            <div className="press-empty-state">
              <div className="empty-icon-large">
                {activeTab === 'news' ? (
                  <FontAwesomeIcon icon={faNewspaper} />
                ) : (
                  <FontAwesomeIcon icon={faVideo} />
                )}
              </div>
              <h2>Select an item to view details</h2>
              <p>
                {activeTab === 'news' 
                  ? 'Choose a press release from the list to read the full article' 
                  : 'Select a meeting to watch the live stream or recording'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PressReleasesPage;
