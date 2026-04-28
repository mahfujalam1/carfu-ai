import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Forgot Password</h2>
        <p className="text-sm text-zinc-500">
          Enter your email address to receive an OTP
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <Input
          type="email"
          placeholder="Email"
          className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black"
          required
        />
        <Button
          onClick={() => navigate("/auth/otp")}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full cursor-pointer text-lg font-medium mt-4"
        >
          Send OTP
        </Button>
      </div>

      <div className="text-center">
        <Link to="/auth/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
          Back to login
        </Link>
      </div>
    </div>
  );
}
