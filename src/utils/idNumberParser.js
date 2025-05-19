/**
 * South African ID Number Parser
 *
 * Parses a South African ID number (13 digits: YYMMDDSSSSCAZ) and extracts:
 * - Date of birth (YYMMDD)
 * - Gender (SSSS: 0000-4999 = Female, 5000-9999 = Male)
 * - Citizenship status (C: 0 = SA citizen, 1 = Permanent resident)
 * - Validates the ID number using the Luhn algorithm (Z)
 */

/**
 * Validates a South African ID number using the Luhn algorithm
 * @param {string} idNumber - The 13-digit ID number
 * @returns {boolean} - Whether the ID number is valid
 */
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

/**
 * Extracts the date of birth from a South African ID number
 * @param {string} idNumber - The 13-digit ID number
 * @returns {Object} - Date of birth information
 */
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

    // Format date in a readable way
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

/**
 * Calculates age based on birth date
 * @param {Date} birthDate - The birth date
 * @returns {number} - The age in years
 */
const calculateAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Extracts gender information from a South African ID number
 * @param {string} idNumber - The 13-digit ID number
 * @returns {Object} - Gender information
 */
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

/**
 * Extracts citizenship status from a South African ID number
 * @param {string} idNumber - The 13-digit ID number
 * @returns {Object} - Citizenship information
 */
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

/**
 * Parses a South African ID number and extracts all information
 * @param {string} idNumber - The 13-digit ID number
 * @returns {Object} - All extracted information and validation status
 */
export const parseIdNumber = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string') {
    return {
      valid: false,
      error: 'ID number is required'
    };
  }

  // Remove spaces and hyphens
  const cleanIdNumber = idNumber.replace(/[\s-]/g, '');

  if (cleanIdNumber.length !== 13 || !/^\d+$/.test(cleanIdNumber)) {
    return {
      valid: false,
      error: 'ID number must be 13 digits'
    };
  }

  const isChecksumValid = validateIdNumberChecksum(cleanIdNumber);
  if (!isChecksumValid) {
    return {
      valid: false,
      error: 'ID number checksum is invalid'
    };
  }

  const dateOfBirth = extractDateOfBirth(cleanIdNumber);
  const gender = extractGender(cleanIdNumber);
  const citizenship = extractCitizenship(cleanIdNumber);

  if (!dateOfBirth.valid) {
    return {
      valid: false,
      error: dateOfBirth.error
    };
  }

  return {
    valid: true,
    idNumber: cleanIdNumber,
    dateOfBirth,
    gender,
    citizenship,
    formattedIdNumber: cleanIdNumber.replace(/(\d{6})(\d{4})(\d{1})(\d{1})(\d{1})/, '$1 $2 $3 $4 $5')
  };
};

export default parseIdNumber;
