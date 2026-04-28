import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Set demo token and redirect
    Cookies.set("demo_token", "demo-val-123", { expires: 7 });
    navigate("/chat");
  };

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">Carfu AI</h1>
        <div className="h-8" /> {/* Spacer */}
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Welcome Back</h2>
        <p className="text-sm text-zinc-500">
          Log in to your account or{" "}
          <Link to="/auth/signup" className="text-zinc-900 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2 text-left">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="h-12 bg-zinc-50 border-none rounded-2xl px-4"
            required
          />
        </div>
        <div className="grid gap-2 text-left relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12 bg-zinc-50 border-none rounded-2xl px-4 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button
          onClick={handleLogin}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 cursor-pointer text-white rounded-full text-lg font-medium mt-4"
        >
          Continue
        </Button>
      </div>

      <div className="text-center">
        <Link
          to="/auth/forgot-password"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
