/**
 * Validation utilities for form fields
 */

export interface ValidationErrors {
  name?: string;
  email?: string;
  age?: string;
  [key: string]: string | undefined;
}

/**
 * Validate name field
 */
export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Name is required.';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }
  return undefined;
};

/**
 * Validate email field
 */
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Enter a valid email.';
  }
  return undefined;
};

/**
 * Validate age field
 */
export const validateAge = (age: string | number): string | undefined => {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
  
  if (age.toString().trim() === '') {
    return 'Age is required.';
  }
  if (Number.isNaN(ageNum)) {
    return 'Enter a valid age.';
  }
  if (ageNum <= 0) {
    return 'Age must be greater than 0.';
  }
  if (ageNum > 150) {
    return 'Age must be less than 150.';
  }
  return undefined;
};

/**
 * Validate entire user form
 */
export const validateUserForm = (data: {
  name: string;
  email: string;
  age: string | number;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const ageError = validateAge(data.age);
  if (ageError) errors.age = ageError;

  return errors;
};

/**
 * Check if validation errors exist
 */
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};

/**
 * Clear specific error field
 */
export const clearError = (errors: ValidationErrors, field: string): ValidationErrors => {
  return {
    ...errors,
    [field]: undefined,
  };
};

/**
 * Clear all errors
 */
export const clearAllErrors = (): ValidationErrors => {
  return {};
};
