import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faWater,
  faHome,
  faMoneyBill,
  faSearch,
  faDownload,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import './UtilitiesPage.css';

const UtilitiesPage = () => {
  const [activeTab, setActiveTab] = useState('electricity');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock South African utility data
  const utilityData = {
    electricity: {
      provider: 'Eskom',
      accountNumber: '1234567890',
      meterNumber: 'E-45678901',
      currentBalance: 'R 750.25',
      lastPayment: 'R 500.00',
      lastPaymentDate: '15 May 2025',
      currentUsage: '320 kWh',
      dueDate: '30 June 2025',
      history: [
        {
          month: 'May 2025',
          amount: 'R 750.25',
          usage: '320 kWh',
          status: 'Due',
        },
        {
          month: 'April 2025',
          amount: 'R 680.50',
          usage: '290 kWh',
          status: 'Paid',
        },
        {
          month: 'March 2025',
          amount: 'R 720.75',
          usage: '310 kWh',
          status: 'Paid',
        },
        {
          month: 'February 2025',
          amount: 'R 650.30',
          usage: '275 kWh',
          status: 'Paid',
        },
        {
          month: 'January 2025',
          amount: 'R 820.15',
          usage: '350 kWh',
          status: 'Paid',
        },
      ],
    },
    water: {
      provider: 'Johannesburg Water',
      accountNumber: '9876543210',
      meterNumber: 'W-12345678',
      currentBalance: 'R 420.80',
      lastPayment: 'R 400.00',
      lastPaymentDate: '10 May 2025',
      currentUsage: '18 kL',
      dueDate: '30 June 2025',
      history: [
        {
          month: 'May 2025',
          amount: 'R 420.80',
          usage: '18 kL',
          status: 'Due',
        },
        {
          month: 'April 2025',
          amount: 'R 395.50',
          usage: '17 kL',
          status: 'Paid',
        },
        {
          month: 'March 2025',
          amount: 'R 440.25',
          usage: '19 kL',
          status: 'Paid',
        },
        {
          month: 'February 2025',
          amount: 'R 372.60',
          usage: '16 kL',
          status: 'Paid',
        },
        {
          month: 'January 2025',
          amount: 'R 465.30',
          usage: '20 kL',
          status: 'Paid',
        },
      ],
    },
    rates: {
      provider: 'City of Johannesburg',
      accountNumber: '5678901234',
      propertyAddress: '123 Nelson Mandela Drive, Johannesburg',
      currentBalance: 'R 1,250.00',
      lastPayment: 'R 1,250.00',
      lastPaymentDate: '5 May 2025',
      dueDate: '30 June 2025',
      history: [
        { month: 'May 2025', amount: 'R 1,250.00', status: 'Due' },
        { month: 'April 2025', amount: 'R 1,250.00', status: 'Paid' },
        { month: 'March 2025', amount: 'R 1,250.00', status: 'Paid' },
        { month: 'February 2025', amount: 'R 1,250.00', status: 'Paid' },
        { month: 'January 2025', amount: 'R 1,250.00', status: 'Paid' },
      ],
    },
    other: {
      provider: 'Various',
      accounts: [
        {
          name: 'TV License',
          accountNumber: 'TV-987654321',
          currentBalance: 'R 265.00',
          dueDate: '30 June 2025',
          status: 'Due',
        },
        {
          name: 'Internet Service',
          accountNumber: 'INT-123456789',
          currentBalance: 'R 699.00',
          dueDate: '15 June 2025',
          status: 'Due',
        },
      ],
    },
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handlePayNow = () => {
    alert('Redirecting to payment gateway...');
    // In a real app, this would redirect to a payment processor
  };

  const renderUtilityDetails = () => {
    const data = utilityData[activeTab];

    if (activeTab === 'electricity' || activeTab === 'water') {
      return (
        <div className="utility-details">
          <div className="utility-summary">
            <div className="summary-item">
              <h3>Provider</h3>
              <p>{data.provider}</p>
            </div>
            <div className="summary-item">
              <h3>Account Number</h3>
              <p>{data.accountNumber}</p>
            </div>
            <div className="summary-item">
              <h3>Meter Number</h3>
              <p>{data.meterNumber}</p>
            </div>
            <div className="summary-item highlight">
              <h3>Current Balance</h3>
              <p className="balance">{data.currentBalance}</p>
            </div>
          </div>

          <div className="utility-usage">
            <h3>Current Usage</h3>
            <div className="usage-display">
              <div className="usage-value">{data.currentUsage}</div>
              <div className="usage-period">This Month</div>
            </div>
            <div className="usage-info">
              <div className="info-item">
                <span>Last Payment:</span>
                <span>{data.lastPayment}</span>
              </div>
              <div className="info-item">
                <span>Payment Date:</span>
                <span>{data.lastPaymentDate}</span>
              </div>
              <div className="info-item">
                <span>Due Date:</span>
                <span>{data.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="payment-actions">
            <button className="pay-now-button" onClick={handlePayNow}>
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Pay Now</span>
            </button>
            <button className="download-statement">
              <FontAwesomeIcon icon={faDownload} />
              <span>Download Statement</span>
            </button>
          </div>

          <div className="billing-history">
            <h3>Billing History</h3>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Usage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>{item.amount}</td>
                    <td>{item.usage}</td>
                    <td
                      className={
                        item.status === 'Paid' ? 'status-paid' : 'status-due'
                      }
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'rates') {
      return (
        <div className="utility-details">
          <div className="utility-summary">
            <div className="summary-item">
              <h3>Provider</h3>
              <p>{data.provider}</p>
            </div>
            <div className="summary-item">
              <h3>Account Number</h3>
              <p>{data.accountNumber}</p>
            </div>
            <div className="summary-item">
              <h3>Property Address</h3>
              <p>{data.propertyAddress}</p>
            </div>
            <div className="summary-item highlight">
              <h3>Current Balance</h3>
              <p className="balance">{data.currentBalance}</p>
            </div>
          </div>

          <div className="utility-usage">
            <div className="usage-info">
              <div className="info-item">
                <span>Last Payment:</span>
                <span>{data.lastPayment}</span>
              </div>
              <div className="info-item">
                <span>Payment Date:</span>
                <span>{data.lastPaymentDate}</span>
              </div>
              <div className="info-item">
                <span>Due Date:</span>
                <span>{data.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="payment-actions">
            <button className="pay-now-button" onClick={handlePayNow}>
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Pay Now</span>
            </button>
            <button className="download-statement">
              <FontAwesomeIcon icon={faDownload} />
              <span>Download Statement</span>
            </button>
          </div>

          <div className="billing-history">
            <h3>Billing History</h3>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>{item.amount}</td>
                    <td
                      className={
                        item.status === 'Paid' ? 'status-paid' : 'status-due'
                      }
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'other') {
      return (
        <div className="utility-details">
          <h3>Other Accounts</h3>

          {data.accounts.map((account, index) => (
            <div className="other-account" key={index}>
              <div className="account-header">
                <h4>{account.name}</h4>
                <span
                  className={
                    account.status === 'Paid' ? 'status-paid' : 'status-due'
                  }
                >
                  {account.status}
                </span>
              </div>

              <div className="account-details">
                <div className="account-info">
                  <div className="info-item">
                    <span>Account Number:</span>
                    <span>{account.accountNumber}</span>
                  </div>
                  <div className="info-item">
                    <span>Due Date:</span>
                    <span>{account.dueDate}</span>
                  </div>
                </div>

                <div className="account-balance">
                  <span>Balance:</span>
                  <span className="balance">{account.currentBalance}</span>
                </div>
              </div>

              <button className="pay-now-button" onClick={handlePayNow}>
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Pay Now</span>
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="utilities-container">
      <div className="utilities-header">
        <div className="utilities-title-section">
          <h1>Pay Utilities</h1>
          <p>View and pay your utility bills</p>
        </div>

        <div className="utilities-actions">
          <div className="utilities-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="utilities-content">
        <div className="utilities-tabs">
          <button
            className={`tab-button ${activeTab === 'electricity' ? 'active' : ''}`}
            onClick={() => handleTabChange('electricity')}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            <span>Electricity</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'water' ? 'active' : ''}`}
            onClick={() => handleTabChange('water')}
          >
            <FontAwesomeIcon icon={faWater} />
            <span>Water</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'rates' ? 'active' : ''}`}
            onClick={() => handleTabChange('rates')}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Rates & Taxes</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => handleTabChange('other')}
          >
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Other Bills</span>
          </button>
        </div>

        {renderUtilityDetails()}
      </div>
    </div>
  );
};

export default UtilitiesPage;
