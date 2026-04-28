import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900  ">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900  ">Reset Password</h2>
        <p className="text-sm text-zinc-500">
          Enter your new password
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 pr-12 focus-visible:ring-zinc-200 transition-all text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[14px] text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Input
          type="password"
          placeholder="Confirm Password"
          className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black"
          required
        />
        <Button 
          onClick={() => navigate("/auth/login")}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer rounded-full text-lg font-medium mt-4"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}
