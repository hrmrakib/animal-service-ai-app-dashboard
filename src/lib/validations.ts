export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const checkPasswordStrength = (password: string) => {
  const requirements = {
    isMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\-_]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  let feedback = "Weak";
  if (score === 5) feedback = "Strong";
  else if (score >= 3) feedback = "Good";
  else if (score >= 2) feedback = "Fair";

  return { score, feedback, ...requirements };
};
