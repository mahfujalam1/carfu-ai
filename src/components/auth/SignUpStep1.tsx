import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Sign up</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your email address or{" "}
          <Link to="/auth/login" className="text-zinc-900 dark:text-zinc-100 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <Input
          type="email"
          placeholder="Email"
          className="h-12 bg-zinc-50 border-none rounded-2xl px-4"
          required
        />
        <Button 
          onClick={onNext}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-lg font-medium mt-4"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
