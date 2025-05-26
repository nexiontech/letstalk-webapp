/**
 * Utility to generate a valid South African ID number for testing
 */

/**
 * Calculates the checksum digit for a South African ID number
 * @param {string} idNumberWithoutChecksum - The first 12 digits of the ID number
 * @returns {number} - The checksum digit
 */
const calculateChecksum = idNumberWithoutChecksum => {
  let sum = 0;

  // Process each digit
  for (let i = 0; i < 12; i++) {
    let digit = parseInt(idNumberWithoutChecksum.charAt(i), 10);

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
  return (10 - (sum % 10)) % 10;
};

/**
 * Generates a valid South African ID number
 * @param {Object} options - Options for generating the ID number
 * @param {string} options.year - Year of birth (YY)
 * @param {string} options.month - Month of birth (MM)
 * @param {string} options.day - Day of birth (DD)
 * @param {string} options.gender - Gender ('male' or 'female')
 * @param {string} options.citizenship - Citizenship ('citizen' or 'resident')
 * @returns {string} - A valid 13-digit South African ID number
 */
const generateValidIdNumber = (options = {}) => {
  // Default values
  const year = options.year || '92';
  const month = options.month || '02';
  const day = options.day || '20';

  // Gender: 0000-4999 for female, 5000-9999 for male
  let genderDigits;
  if (options.gender === 'male') {
    genderDigits = Math.floor(Math.random() * 5000) + 5000;
  } else {
    genderDigits = Math.floor(Math.random() * 5000);
  }
  genderDigits = genderDigits.toString().padStart(4, '0');

  // Citizenship: 0 for SA citizen, 1 for permanent resident
  const citizenshipDigit = options.citizenship === 'resident' ? '1' : '0';

  // Race classification (historical, not used anymore): 8 is a common value
  const raceDigit = '8';

  // Combine the first 12 digits
  const idNumberWithoutChecksum = `${year}${month}${day}${genderDigits}${citizenshipDigit}${raceDigit}`;

  // Calculate the checksum
  const checksumDigit = calculateChecksum(idNumberWithoutChecksum);

  // Return the complete ID number
  return `${idNumberWithoutChecksum}${checksumDigit}`;
};

// Generate some valid ID numbers for testing
console.log(
  'Female SA Citizen:',
  generateValidIdNumber({ gender: 'female', citizenship: 'citizen' })
);
console.log(
  'Male SA Citizen:',
  generateValidIdNumber({ gender: 'male', citizenship: 'citizen' })
);
console.log(
  'Female Permanent Resident:',
  generateValidIdNumber({ gender: 'female', citizenship: 'resident' })
);
console.log(
  'Male Permanent Resident:',
  generateValidIdNumber({ gender: 'male', citizenship: 'resident' })
);

export default generateValidIdNumber;
