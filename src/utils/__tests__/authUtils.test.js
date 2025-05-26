import {
  validateEmail,
  validatePassword,
  validateIdNumber,
  doPasswordsMatch,
  validateOTP,
} from '../authUtils';

describe('validateEmail', () => {
  test('validates correct email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('rejects invalid email formats', () => {
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('test@example')).toBe(false);
    expect(validateEmail('test.com')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test@.com')).toBe(false);
  });
});

describe('validatePassword', () => {
  test('accepts valid password', () => {
    const result = validatePassword('Test123!@#');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('rejects password without uppercase', () => {
    const result = validatePassword('test123!@#');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Password must contain at least one uppercase letter'
    );
  });

  test('rejects password without lowercase', () => {
    const result = validatePassword('TEST123!@#');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Password must contain at least one lowercase letter'
    );
  });

  test('rejects password without numbers', () => {
    const result = validatePassword('TestTest!@#');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Password must contain at least one number'
    );
  });

  test('rejects password without special characters', () => {
    const result = validatePassword('TestTest123');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Password must contain at least one special character (!@#$%^&*)'
    );
  });

  test('rejects short password', () => {
    const result = validatePassword('Te1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Password must be at least 8 characters long'
    );
  });
});

describe('validateIdNumber', () => {
  test('accepts valid 13-digit ID number', () => {
    // Using a valid SA ID number that passes checksum validation
    expect(validateIdNumber('9001010001088')).toBe(true);
  });

  test('rejects ID numbers with wrong length', () => {
    expect(validateIdNumber('123456789012')).toBe(false);
    expect(validateIdNumber('12345678901234')).toBe(false);
  });

  test('rejects ID numbers with non-digits', () => {
    expect(validateIdNumber('12345a789012')).toBe(false);
  });

  test('rejects ID numbers with invalid checksum', () => {
    expect(validateIdNumber('1234567890123')).toBe(false);
  });
});

describe('doPasswordsMatch', () => {
  test('returns true when passwords match', () => {
    expect(doPasswordsMatch('Test123!@#', 'Test123!@#')).toBe(true);
  });

  test('returns false when passwords do not match', () => {
    expect(doPasswordsMatch('Test123!@#', 'Test123!@')).toBe(false);
  });
});

describe('validateOTP', () => {
  test('accepts valid 6-digit OTP', () => {
    expect(validateOTP('123456')).toBe(true);
  });

  test('rejects OTP with wrong length', () => {
    expect(validateOTP('12345')).toBe(false);
    expect(validateOTP('1234567')).toBe(false);
  });

  test('rejects OTP with non-digits', () => {
    expect(validateOTP('12a456')).toBe(false);
  });
});
