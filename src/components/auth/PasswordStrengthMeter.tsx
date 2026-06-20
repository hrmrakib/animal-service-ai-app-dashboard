import type { PasswordStrengthInfo } from "@/types/auth";

interface Props {
  strength: PasswordStrengthInfo;
}

export default function PasswordStrengthMeter({ strength }: Props) {
  const getBarColor = (index: number) => {
    if (strength.score === 0) return "bg-gray-200";
    if (strength.score < 3) {
      return index < strength.score ? "bg-red-500" : "bg-gray-200";
    }
    if (strength.score < 5) {
      return index < strength.score ? "bg-amber-500" : "bg-gray-200";
    }
    return "bg-green-500";
  };

  return (
    <div className="w-full mt-4 space-y-4">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 font-medium">Password Strength</span>
        <span className={`font-semibold ${
          strength.score < 3 ? "text-red-500" : strength.score < 5 ? "text-amber-500" : "text-green-500"
        }`}>
          {strength.feedback}
        </span>
      </div>
      
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 w-full rounded-full transition-colors duration-300 ${getBarColor(i)}`} />
        ))}
      </div>

      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 text-[11px] text-gray-500 space-y-2 mt-4">
        <p className="font-semibold text-gray-700 mb-3 text-xs">Password must contain:</p>
        
        <RequirementRow fulfilled={strength.isMinLength} text="At least 8 characters" />
        <RequirementRow fulfilled={strength.hasUpperCase} text="One uppercase letter" />
        <RequirementRow fulfilled={strength.hasLowerCase} text="One lowercase letter" />
        <RequirementRow fulfilled={strength.hasNumber} text="One number" />
        <RequirementRow fulfilled={strength.hasSpecialChar} text="One special character" />
      </div>
    </div>
  );
}

function RequirementRow({ fulfilled, text }: { fulfilled: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {fulfilled ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      )}
      <span className={fulfilled ? "text-brand" : "text-gray-500"}>{text}</span>
    </div>
  );
}
