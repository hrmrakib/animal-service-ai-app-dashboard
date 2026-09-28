import { useMemo } from "react";
import { checkPasswordStrength } from "@/lib/validations";
import type { PasswordStrengthInfo } from "@/types/auth";

export const usePasswordStrength = (password: string): PasswordStrengthInfo => {
  const strength = useMemo(() => checkPasswordStrength(password), [password]);
  return strength;
};
