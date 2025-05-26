import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWater,
  faBolt,
  faHome,
  faIdCard,
  faPassport,
  faCarSide,
  faGraduationCap,
  faMoneyBillWave,
  faSearch,
  faChevronRight,
  faHistory,
  faReceipt,
  faFilter,
  faCheckCircle,
  faInfoCircle,
  faStar,
  faBuilding,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../translations';
import './GovernmentServicesPage.css';

const GovernmentServicesPage = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: '',
    amount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    savePaymentMethod: false,
  });

  // Sample data for services
  const services = [
    {
      id: 1,
      title: 'Electricity Payment',
      category: 'utilities',
      icon: faBolt,
      color: '#f39c12',
      description:
        'Pay your electricity bill to your local municipality or Eskom.',
      provider: 'Eskom / Local Municipality',
      accountFormat: '10-digit account number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT', 'Instant EFT'],
      popularService: true,
      instructions:
        'Enter your electricity account number and the amount you wish to pay. You can find your account number on your latest bill or prepaid meter.',
    },
    {
      id: 2,
      title: 'Water & Sanitation',
      category: 'utilities',
      icon: faWater,
      color: '#3498db',
      description:
        'Pay your water and sanitation bill to your local municipality.',
      provider: 'Local Municipality',
      accountFormat: 'Municipal account number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: true,
      instructions:
        'Enter your municipal account number and the amount you wish to pay. Your account number can be found on your latest municipal bill.',
    },
    {
      id: 3,
      title: 'Property Rates',
      category: 'property',
      icon: faHome,
      color: '#27ae60',
      description:
        'Pay your property rates and taxes to your local municipality.',
      provider: 'Local Municipality',
      accountFormat: 'Municipal account number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: false,
      instructions:
        'Enter your municipal account number and the amount you wish to pay. Your account number can be found on your latest municipal bill.',
    },
    {
      id: 4,
      title: 'Traffic Fines',
      category: 'transport',
      icon: faCarSide,
      color: '#e74c3c',
      description:
        'Pay your traffic fines to avoid penalties and legal action.',
      provider: 'RTMC / Local Municipality',
      accountFormat: 'Fine reference number',
      acceptsPartial: false,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: true,
      instructions:
        'Enter your traffic fine reference number. The full amount must be paid - partial payments are not accepted for traffic fines.',
    },
    {
      id: 5,
      title: 'Vehicle License Renewal',
      category: 'transport',
      icon: faCarSide,
      color: '#9b59b6',
      description: 'Renew your vehicle license (motor vehicle license disc).',
      provider: 'Department of Transport',
      accountFormat: 'Vehicle registration number',
      acceptsPartial: false,
      paymentMethods: ['Credit Card', 'Debit Card'],
      popularService: true,
      instructions:
        'Enter your vehicle registration number. You will need to collect your license disc from your nearest licensing department after payment.',
    },
    {
      id: 6,
      title: 'SARS Tax Payment',
      category: 'tax',
      icon: faMoneyBillWave,
      color: '#f1c40f',
      description: 'Make payments to the South African Revenue Service.',
      provider: 'SARS',
      accountFormat: 'Tax reference number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: false,
      instructions:
        'Enter your tax reference number and the amount you wish to pay. For specific tax types, please visit the SARS eFiling website.',
    },
    {
      id: 7,
      title: 'ID Application Fee',
      category: 'identity',
      icon: faIdCard,
      color: '#34495e',
      description: 'Pay for your new ID card application or renewal.',
      provider: 'Department of Home Affairs',
      accountFormat: 'ID number',
      acceptsPartial: false,
      paymentMethods: ['Credit Card', 'Debit Card'],
      popularService: false,
      instructions:
        'Enter your ID number. After payment, you will need to visit your nearest Home Affairs office to complete the application process.',
    },
    {
      id: 8,
      title: 'Passport Application Fee',
      category: 'identity',
      icon: faPassport,
      color: '#16a085',
      description: 'Pay for your passport application or renewal.',
      provider: 'Department of Home Affairs',
      accountFormat: 'ID number',
      acceptsPartial: false,
      paymentMethods: ['Credit Card', 'Debit Card'],
      popularService: false,
      instructions:
        'Enter your ID number. After payment, you will need to visit your nearest Home Affairs office to complete the application process.',
    },
    {
      id: 9,
      title: 'NSFAS Loan Repayment',
      category: 'education',
      icon: faGraduationCap,
      color: '#2980b9',
      description: 'Make repayments towards your NSFAS student loan.',
      provider: 'NSFAS',
      accountFormat: 'NSFAS reference number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: false,
      instructions:
        'Enter your NSFAS reference number and the amount you wish to pay. You can make partial payments towards your outstanding balance.',
    },
    {
      id: 10,
      title: 'TV License',
      category: 'other',
      icon: faBuilding,
      color: '#8e44ad',
      description: 'Pay your annual television license fee.',
      provider: 'SABC',
      accountFormat: 'TV license number',
      acceptsPartial: false,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: false,
      instructions:
        'Enter your TV license number. You can find this on your TV license invoice or renewal notice.',
    },
    {
      id: 11,
      title: 'UIF Contributions',
      category: 'other',
      icon: faShieldAlt,
      color: '#d35400',
      description: 'Make Unemployment Insurance Fund contributions.',
      provider: 'Department of Labour',
      accountFormat: 'UIF reference number',
      acceptsPartial: true,
      paymentMethods: ['Credit Card', 'Debit Card', 'EFT'],
      popularService: false,
      instructions:
        'Enter your UIF reference number and the amount you wish to contribute. This service is primarily for employers making contributions.',
    },
  ];

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    // Filter by search query
    if (
      searchQuery &&
      !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (activeCategory !== 'all' && service.category !== activeCategory) {
      return false;
    }

    return true;
  });

  // Popular services for quick access
  const popularServices = services.filter(service => service.popularService);

  const handleCategoryChange = category => {
    setActiveCategory(category);
    setSelectedService(null);
  };

  const handleServiceSelect = service => {
    setSelectedService(service);
    setPaymentStep(1);
    setPaymentDetails({
      accountNumber: '',
      amount: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      savePaymentMethod: false,
    });
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNextStep = () => {
    if (paymentStep < 3) {
      setPaymentStep(paymentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (paymentStep > 1) {
      setPaymentStep(paymentStep - 1);
    }
  };

  const handlePaymentSubmit = e => {
    e.preventDefault();
    // In a real app, this would process the payment
    // For now, we'll just simulate a successful payment
    setPaymentStep(4); // Success step
  };

  const renderServiceCategories = () => {
    const categories = [
      { id: 'all', name: 'All Services', icon: faSearch },
      { id: 'utilities', name: 'Utilities', icon: faBolt },
      { id: 'property', name: 'Property', icon: faHome },
      { id: 'transport', name: 'Transport', icon: faCarSide },
      { id: 'tax', name: 'Tax', icon: faMoneyBillWave },
      { id: 'identity', name: 'Identity', icon: faIdCard },
      { id: 'education', name: 'Education', icon: faGraduationCap },
      { id: 'other', name: 'Other', icon: faBuilding },
    ];

    return (
      <div className="service-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderServicesList = () => (
    <div className="services-list">
      {filteredServices.length > 0 ? (
        filteredServices.map(service => (
          <div
            key={service.id}
            className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
            onClick={() => handleServiceSelect(service)}
          >
            <div
              className="service-icon"
              style={{
                backgroundColor: `${service.color}20`,
                color: service.color,
              }}
            >
              <FontAwesomeIcon icon={service.icon} />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-provider">
                <FontAwesomeIcon icon={faBuilding} />
                <span>{service.provider}</span>
              </div>
            </div>
            <div className="service-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        ))
      ) : (
        <div className="no-services">
          <FontAwesomeIcon icon={faInfoCircle} className="no-results-icon" />
          <p>No services match your search criteria</p>
        </div>
      )}
    </div>
  );

  const renderPopularServices = () => (
    <div className="popular-services">
      <h3 className="section-title">
        <FontAwesomeIcon icon={faStar} />
        <span>{t('governmentServices.popularServices')}</span>
      </h3>
      <div className="popular-services-grid">
        {popularServices.map(service => (
          <div
            key={service.id}
            className="popular-service-card"
            onClick={() => handleServiceSelect(service)}
          >
            <div
              className="popular-service-icon"
              style={{ backgroundColor: service.color }}
            >
              <FontAwesomeIcon icon={service.icon} />
            </div>
            <h4>{service.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentSteps = () => {
    const steps = [
      { number: 1, title: t('governmentServices.accountDetails') },
      { number: 2, title: t('governmentServices.paymentMethod') },
      { number: 3, title: t('governmentServices.confirmPayment') },
    ];

    return (
      <div className="payment-steps">
        {steps.map(step => (
          <div
            key={step.number}
            className={`step ${paymentStep >= step.number ? 'active' : ''} ${paymentStep === step.number ? 'current' : ''}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderAccountDetailsForm = () => (
    <div className="payment-form-step">
      <h3>Enter Account Details</h3>
      <p className="form-instructions">{selectedService.instructions}</p>

      <div className="form-group">
        <label htmlFor="accountNumber">
          {selectedService.accountFormat}
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={paymentDetails.accountNumber}
          onChange={handleInputChange}
          required
          placeholder={`Enter your ${selectedService.accountFormat}`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">
          Amount (ZAR)
          <span className="required">*</span>
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={paymentDetails.amount}
          onChange={handleInputChange}
          required
          placeholder="Enter amount to pay"
          min="1"
          step="0.01"
        />
      </div>

      {!selectedService.acceptsPartial && (
        <div className="info-message">
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>This service requires payment of the full amount due.</span>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setSelectedService(null)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handleNextStep}
          disabled={!paymentDetails.accountNumber || !paymentDetails.amount}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderPaymentMethodForm = () => (
    <div className="payment-form-step">
      <h3>Payment Method</h3>
      <p className="form-instructions">
        Enter your card details to make a secure payment.
      </p>

      <div className="form-group">
        <label htmlFor="cardName">
          Cardholder Name
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={paymentDetails.cardName}
          onChange={handleInputChange}
          required
          placeholder="Enter name as it appears on card"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardNumber">
          Card Number
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          required
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength="19"
        />
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="expiryDate">
            Expiry Date
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            required
            placeholder="MM/YY"
            maxLength="5"
          />
        </div>

        <div className="form-group half">
          <label htmlFor="cvv">
            CVV
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
            placeholder="XXX"
            maxLength="3"
          />
        </div>
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="savePaymentMethod"
          name="savePaymentMethod"
          checked={paymentDetails.savePaymentMethod}
          onChange={handleInputChange}
        />
        <label htmlFor="savePaymentMethod">
          Save this payment method for future transactions
        </label>
      </div>

      <div className="secure-payment-info">
        <FontAwesomeIcon icon={faShieldAlt} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handleNextStep}
          disabled={
            !paymentDetails.cardName ||
            !paymentDetails.cardNumber ||
            !paymentDetails.expiryDate ||
            !paymentDetails.cvv
          }
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderConfirmationForm = () => (
    <div className="payment-form-step">
      <h3>Confirm Payment</h3>
      <p className="form-instructions">
        Please review your payment details before confirming.
      </p>

      <div className="confirmation-details">
        <div className="confirmation-section">
          <h4>Service Details</h4>
          <div className="confirmation-row">
            <span className="label">Service:</span>
            <span className="value">{selectedService.title}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Provider:</span>
            <span className="value">{selectedService.provider}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Account:</span>
            <span className="value">{paymentDetails.accountNumber}</span>
          </div>
        </div>

        <div className="confirmation-section">
          <h4>Payment Details</h4>
          <div className="confirmation-row">
            <span className="label">Amount:</span>
            <span className="value highlight">
              R {parseFloat(paymentDetails.amount).toFixed(2)}
            </span>
          </div>
          <div className="confirmation-row">
            <span className="label">Payment Method:</span>
            <span className="value">
              Card ending in {paymentDetails.cardNumber.slice(-4)}
            </span>
          </div>
          <div className="confirmation-row">
            <span className="label">Cardholder:</span>
            <span className="value">{paymentDetails.cardName}</span>
          </div>
        </div>
      </div>

      <div className="terms-agreement">
        <p>
          By clicking "Confirm Payment", you agree to the terms and conditions
          of this service and authorize a charge of R{' '}
          {parseFloat(paymentDetails.amount).toFixed(2)} to your card.
        </p>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handlePaymentSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );

  const renderPaymentSuccess = () => (
    <div className="payment-success">
      <div className="success-icon">
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <h2>{t('governmentServices.paymentSuccess')}</h2>
      <p>
        Your payment of R {parseFloat(paymentDetails.amount).toFixed(2)} for{' '}
        {selectedService.title} has been processed successfully.
      </p>

      <div className="receipt-details">
        <h3>Receipt Details</h3>
        <div className="receipt-row">
          <span className="label">Transaction ID:</span>
          <span className="value">
            TRX{Math.floor(Math.random() * 1000000000)}
          </span>
        </div>
        <div className="receipt-row">
          <span className="label">Date & Time:</span>
          <span className="value">{new Date().toLocaleString()}</span>
        </div>
        <div className="receipt-row">
          <span className="label">Payment Method:</span>
          <span className="value">
            Card ending in {paymentDetails.cardNumber.slice(-4)}
          </span>
        </div>
        <div className="receipt-row">
          <span className="label">Account Number:</span>
          <span className="value">{paymentDetails.accountNumber}</span>
        </div>
        <div className="receipt-row highlight">
          <span className="label">Amount Paid:</span>
          <span className="value">
            R {parseFloat(paymentDetails.amount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="success-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.print()}
        >
          <FontAwesomeIcon icon={faReceipt} />
          <span>Print Receipt</span>
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setSelectedService(null)}
        >
          <FontAwesomeIcon icon={faSearch} />
          <span>Pay Another Bill</span>
        </button>
      </div>
    </div>
  );

  const renderPaymentForm = () => {
    if (paymentStep === 1) {
      return renderAccountDetailsForm();
    } else if (paymentStep === 2) {
      return renderPaymentMethodForm();
    } else if (paymentStep === 3) {
      return renderConfirmationForm();
    } else if (paymentStep === 4) {
      return renderPaymentSuccess();
    }
  };

  const renderServiceDetail = () => (
    <div className="service-detail">
      {paymentStep < 4 && (
        <div className="service-detail-header">
          <div
            className="service-detail-icon"
            style={{ backgroundColor: selectedService.color }}
          >
            <FontAwesomeIcon icon={selectedService.icon} />
          </div>
          <div className="service-detail-title">
            <h2>{selectedService.title}</h2>
            <p>{selectedService.description}</p>
          </div>
        </div>
      )}

      {paymentStep < 4 && renderPaymentSteps()}

      <div className="payment-form-container">{renderPaymentForm()}</div>
    </div>
  );

  const renderRecentPayments = () => (
    <div className="recent-payments">
      <h3 className="section-title">
        <FontAwesomeIcon icon={faHistory} />
        <span>{t('governmentServices.recentPayments')}</span>
      </h3>
      <div className="recent-payments-list">
        <div className="recent-payment-item">
          <div
            className="payment-icon"
            style={{ backgroundColor: '#3498db20', color: '#3498db' }}
          >
            <FontAwesomeIcon icon={faWater} />
          </div>
          <div className="payment-details">
            <h4>Water & Sanitation</h4>
            <p>Municipal Account: ****1234</p>
          </div>
          <div className="payment-amount">
            <span>R 750.00</span>
            <p className="payment-date">15 May 2023</p>
          </div>
        </div>
        <div className="recent-payment-item">
          <div
            className="payment-icon"
            style={{ backgroundColor: '#f39c1220', color: '#f39c12' }}
          >
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <div className="payment-details">
            <h4>Electricity Payment</h4>
            <p>Eskom: ****5678</p>
          </div>
          <div className="payment-amount">
            <span>R 1,200.00</span>
            <p className="payment-date">2 May 2023</p>
          </div>
        </div>
        <div className="recent-payment-item">
          <div
            className="payment-icon"
            style={{ backgroundColor: '#e74c3c20', color: '#e74c3c' }}
          >
            <FontAwesomeIcon icon={faCarSide} />
          </div>
          <div className="payment-details">
            <h4>Traffic Fine</h4>
            <p>Reference: ****9012</p>
          </div>
          <div className="payment-amount">
            <span>R 500.00</span>
            <p className="payment-date">28 Apr 2023</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="government-services-container">
      <div className="services-header">
        <div className="services-title-section">
          <h1>Pay Bills & Government Services</h1>
          <p>Pay for utilities, rates, and access government services</p>
        </div>

        <div className="services-actions">
          <div className="services-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder={t('governmentServices.searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="services-content">
        {!selectedService ? (
          <>
            {renderServiceCategories()}

            <div className="services-main-content">
              {activeCategory === 'all' &&
                searchQuery === '' &&
                renderPopularServices()}

              <div className="services-section">
                <h3 className="section-title">
                  <FontAwesomeIcon icon={faFilter} />
                  <span>
                    {activeCategory === 'all'
                      ? 'All Services'
                      : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services`}
                  </span>
                </h3>
                {renderServicesList()}
              </div>

              {activeCategory === 'all' &&
                searchQuery === '' &&
                renderRecentPayments()}
            </div>
          </>
        ) : (
          renderServiceDetail()
        )}
      </div>
    </div>
  );
};

export default GovernmentServicesPage;
