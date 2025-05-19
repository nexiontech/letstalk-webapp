# South African ID Number Parser

## Overview

The South African ID Number Parser is a utility that extracts and validates information from South African ID numbers. It is used in the user profile page to automatically display additional user information based on their ID number.

## South African ID Number Structure

South African ID numbers follow a specific 13-digit structure (YYMMDDSSSSCAZ):

1. **Date of Birth (YYMMDD - first 6 digits)**:
   - Year (YY): 00-99
   - Month (MM): 01-12
   - Day (DD): 01-31

2. **Gender (SSSS - digits 7-10)**:
   - 0000-4999 = Female
   - 5000-9999 = Male

3. **Citizenship Status (C - digit 11)**:
   - 0 = South African citizen
   - 1 = Permanent resident

4. **Race Classification (A - digit 12)**:
   - Historical digit, no longer used for classification
   - Not displayed in the application

5. **Checksum (Z - digit 13)**:
   - Validation digit calculated using the Luhn algorithm

## Implementation

### Key Files

- **Parser Utility**: [`src/utils/idNumberParser.js`](../../src/utils/idNumberParser.js)
- **Display Component**: [`src/components/IdNumberInfo.jsx`](../../src/components/IdNumberInfo.jsx)
- **Test File**: [`src/utils/__tests__/idNumberParser.test.js`](../../src/utils/__tests__/idNumberParser.test.js)
- **Test Utility**: [`src/utils/generateValidIdNumber.js`](../../src/utils/generateValidIdNumber.js)

### Parser Functions

The ID number parser provides the following functions:

#### 1. Validation

```javascript
export const validateIdNumberChecksum = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
    return false;
  }

  // South African ID number uses a modified Luhn algorithm
  let sum = 0;
  
  // Process each digit
  for (let i = 0; i < 12; i++) {
    let digit = parseInt(idNumber.charAt(i), 10);
    
    // Double every second digit (odd positions)
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
  }
  
  // Calculate the check digit (last digit)
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  const providedCheckDigit = parseInt(idNumber.charAt(12), 10);
  
  return calculatedCheckDigit === providedCheckDigit;
};
```

#### 2. Date of Birth Extraction

```javascript
export const extractDateOfBirth = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const year = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);

    // Determine century: 00-29 = 2000s, 30-99 = 1900s
    const fullYear = parseInt(year, 10) < 30 ? `20${year}` : `19${year}`;
    
    // Create date object
    const dateObj = new Date(`${fullYear}-${month}-${day}`);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return { valid: false, error: 'Invalid date in ID number' };
    }

    // Format date and calculate age
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const formattedDate = `${parseInt(day, 10)} ${monthNames[dateObj.getMonth()]} ${fullYear}`;
    const age = calculateAge(dateObj);
    
    return {
      valid: true,
      dateObj,
      formattedDate,
      day: parseInt(day, 10),
      month: parseInt(month, 10),
      monthName: monthNames[dateObj.getMonth()],
      year: parseInt(fullYear, 10),
      age
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing date of birth' };
  }
};
```

#### 3. Gender Extraction

```javascript
export const extractGender = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const genderDigits = parseInt(idNumber.substring(6, 10), 10);
    const gender = genderDigits < 5000 ? 'Female' : 'Male';
    
    return {
      valid: true,
      gender,
      genderCode: genderDigits
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing gender information' };
  }
};
```

#### 4. Citizenship Extraction

```javascript
export const extractCitizenship = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const citizenshipDigit = parseInt(idNumber.charAt(10), 10);
    const status = citizenshipDigit === 0 ? 'South African Citizen' : 'Permanent Resident';
    
    return {
      valid: true,
      citizenshipStatus: status,
      citizenshipCode: citizenshipDigit
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing citizenship information' };
  }
};
```

### Display Component

The `IdNumberInfo` component displays the extracted information in a user-friendly format:

```jsx
return (
  <div className="id-number-info">
    <div className="id-info-section">
      <h3>ID Number Details</h3>
      <div className="id-info-grid">
        <div className="id-info-item">
          <span className="id-info-label">ID Number:</span>
          <span className="id-info-value">{idInfo.formattedIdNumber}</span>
        </div>
        
        <div className="id-info-item">
          <span className="id-info-label">Date of Birth:</span>
          <span className="id-info-value">{idInfo.dateOfBirth.formattedDate}</span>
        </div>
        
        <div className="id-info-item">
          <span className="id-info-label">Age:</span>
          <span className="id-info-value">{idInfo.dateOfBirth.age} years</span>
        </div>
        
        <div className="id-info-item">
          <span className="id-info-label">Gender:</span>
          <span className="id-info-value">{idInfo.gender.gender}</span>
        </div>
        
        <div className="id-info-item">
          <span className="id-info-label">Citizenship:</span>
          <span className="id-info-value">{idInfo.citizenship.citizenshipStatus}</span>
        </div>
      </div>
    </div>
  </div>
);
```

## Testing

The ID number parser is thoroughly tested using Jest. The test file includes tests for:

- Validating checksums
- Extracting date of birth
- Extracting gender
- Extracting citizenship status
- Handling edge cases and errors

A utility function (`generateValidIdNumber.js`) is provided to generate valid South African ID numbers for testing purposes.

## Integration with User Profile

The ID number parser is integrated into the user profile page, where it automatically extracts and displays information from the user's ID number stored in Cognito.

## Security Considerations

- The ID number parser does not store or transmit ID numbers
- ID numbers are only displayed to the authenticated user
- The race classification digit is not used or displayed
- The parser validates ID numbers to ensure they are properly formatted
