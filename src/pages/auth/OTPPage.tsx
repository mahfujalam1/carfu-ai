import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last character if multiple are entered (e.g., from autocomplete)
    const digit = value.slice(-1);
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    // Focus the last filled input or the first empty one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Enter OTP</h2>
        <p className="text-sm text-zinc-500">
          We sent a code to your email
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              ref={(el) => { inputRefs.current[i] = el; }}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-10 h-14 md:w-12 md:h-16 text-center text-xl md:text-2xl font-bold bg-zinc-50 dark:bg-zinc-900/50 border-2 border-transparent focus:border-zinc-900 dark:focus:border-white transition-all rounded-xl text-black"
            />
          ))}
        </div>
        <Button
          onClick={() => navigate("/auth/reset-password")}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 cursor-pointer text-white rounded-full text-lg font-medium mt-4 shadow-xl active:scale-95 transition-transform"
        >
          Verify
        </Button>
      </div>

      <div className="text-center text-sm text-zinc-500">
        Didn't receive code? <button className="text-zinc-900 dark:text-white font-semibold hover:underline">Resend</button>
      </div>
    </div>
  );
}
