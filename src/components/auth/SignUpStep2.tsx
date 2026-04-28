import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Step2Props {
  onNext: () => void;
}

export default function Step2({ onNext }: Step2Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Sign up</h2>
        <p className="text-sm text-zinc-500">
          Create Password
        </p>
      </div>

      <div className="grid gap-4 mt-4 relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
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
        <Button 
          onClick={onNext}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-lg font-medium mt-4"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
