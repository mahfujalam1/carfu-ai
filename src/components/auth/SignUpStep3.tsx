import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import Cookies from "js-cookie";

interface Step3Props {
  onFinish: () => void;
}

export default function Step3({ onFinish }: Step3Props) {
  const handleFinish = () => {
    Cookies.set("demo_token", "demo-val-123", { expires: 7 });
    onFinish();
  };

  return (
    <div className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Set up profile</h2>
      </div>

      <div className="flex justify-center mt-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full border-2 border-white shadow-sm">
            <Camera size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 mt-4">
        <Input
          placeholder="Enter your name"
          className="h-12 bg-zinc-50 border-none rounded-2xl px-4"
          required
        />
        <Input
          placeholder="Date of birth"
          className="h-12 bg-zinc-50 border-none rounded-2xl px-4 text-zinc-400"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          required
        />
        <Button 
          onClick={handleFinish}
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-lg font-medium mt-4 cursor-pointer"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
