import {
  validateIdNumberChecksum,
  extractDateOfBirth,
  extractGender,
  extractCitizenship,
  parseIdNumber,
} from '../idNumberParser';

describe('ID Number Parser', () => {
  // Valid ID number for testing (this is a generated test ID, not a real one)
  const validIdNumber = '9202204049087';

  // Invalid ID number for testing - same as valid but last digit changed
  const invalidIdNumber = '9202204049088'; // Wrong checksum

  describe('validateIdNumberChecksum', () => {
    test('should return true for valid ID number', () => {
      expect(validateIdNumberChecksum(validIdNumber)).toBe(true);
    });

    test('should return false for invalid ID number', () => {
      expect(validateIdNumberChecksum(invalidIdNumber)).toBe(false);
    });

    test('should return false for non-string input', () => {
      expect(validateIdNumberChecksum(123456789012)).toBe(false);
    });

    test('should return false for wrong length', () => {
      expect(validateIdNumberChecksum('12345')).toBe(false);
    });

    test('should return false for non-numeric string', () => {
      expect(validateIdNumberChecksum('123456789012X')).toBe(false);
    });
  });

  describe('extractDateOfBirth', () => {
    test('should extract correct date of birth from valid ID number', () => {
      const result = extractDateOfBirth(validIdNumber);
      expect(result.valid).toBe(true);
      expect(result.year).toBe(1992);
      expect(result.month).toBe(2);
      expect(result.day).toBe(20);
      expect(result.monthName).toBe('February');
      expect(result.formattedDate).toBe('20 February 1992');
    });

    test('should handle 2000s years correctly', () => {
      const result = extractDateOfBirth('0101015012087');
      expect(result.valid).toBe(true);
      expect(result.year).toBe(2001);
    });

    test('should return invalid for incorrect date', () => {
      const result = extractDateOfBirth('9413108012087'); // Month 13 is invalid
      expect(result.valid).toBe(false);
    });
  });

  describe('extractGender', () => {
    test('should extract female gender correctly', () => {
      const result = extractGender('9202204049087'); // 4049 < 5000 = Female
      expect(result.valid).toBe(true);
      expect(result.gender).toBe('Female');
    });

    test('should extract male gender correctly', () => {
      const result = extractGender('9202205820080'); // 5820 >= 5000 = Male
      expect(result.valid).toBe(true);
      expect(result.gender).toBe('Male');
    });
  });

  describe('extractCitizenship', () => {
    test('should extract SA citizen correctly', () => {
      const result = extractCitizenship('9202204049087'); // 0 = SA Citizen
      expect(result.valid).toBe(true);
      expect(result.citizenshipStatus).toBe('South African Citizen');
    });

    test('should extract permanent resident correctly', () => {
      const result = extractCitizenship('9202204970183'); // 1 = Permanent Resident
      expect(result.valid).toBe(true);
      expect(result.citizenshipStatus).toBe('Permanent Resident');
    });
  });

  describe('parseIdNumber', () => {
    test('should parse valid ID number correctly', () => {
      const result = parseIdNumber(validIdNumber);
      expect(result.valid).toBe(true);
      expect(result.dateOfBirth.year).toBe(1992);
      expect(result.gender.gender).toBe('Female');
      expect(result.citizenship.citizenshipStatus).toBe(
        'South African Citizen'
      );
    });

    test('should handle ID number with spaces', () => {
      const result = parseIdNumber('920220 4049 0 8 7');
      expect(result.valid).toBe(true);
      expect(result.idNumber).toBe('9202204049087');
    });

    test('should return invalid for incorrect checksum', () => {
      const result = parseIdNumber(invalidIdNumber);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ID number checksum is invalid');
    });

    test('should return invalid for non-string input', () => {
      const result = parseIdNumber(null);
      expect(result.valid).toBe(false);
    });

    test('should return invalid for wrong length', () => {
      const result = parseIdNumber('12345');
      expect(result.valid).toBe(false);
    });
  });
});
