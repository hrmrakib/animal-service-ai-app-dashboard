export interface PasswordStrengthInfo {
  score: number; // 0 to 5
  feedback: string;
  isMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
