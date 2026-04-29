import { useState, useEffect, useRef } from "react";
import { Mic, ArrowRight, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Preloader from "@/components/shared/Preloader";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => setFile(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("demo_token");
    if (!token) {
      navigate("/auth/login");
    } else {
      navigate("/chat");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Placeholder for actual voice logic
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col overflow-x-hidden">
      {/* Navbar */}
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-10 md:-mt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 md:mb-0">
          Create Videos with Your Own AI Voice
        </h1>
        <p className="text-zinc-400 text-center max-w-2xl mt-4 mb-8 md:mb-12 text-base md:text-lg">
          Upload a video or image, add your script, and generate AI-powered videos with your own voice—no editing skills required.
        </p>

        {/* Search/Input Bar */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all" />

          {/* File Preview */}
          {file && (
            <div className="absolute -top-12 left-4 bg-zinc-800 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs text-zinc-300 animate-in fade-in slide-in-from-bottom-2">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button onClick={removeFile} className="hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-[#2a2a2a] border border-white/10 rounded-full p-2 pl-4 w-full min-w-0"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Plus size={20} />
            </button>

            <input
              type="text"
              placeholder="Write Something"
              className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-white placeholder:text-zinc-500 text-sm"
            />
            
            <div className="flex-shrink-0 flex items-center gap-1 pr-1">
              <button
                type="button"
                onClick={toggleRecording}
                className={cn(
                  "p-2 transition-colors cursor-pointer",
                  isRecording ? "text-red-500 animate-pulse" : "text-zinc-400 hover:text-white"
                )}
              >
                <Mic size={18} />
              </button>
              <button
                type="submit"
                className="bg-white text-black p-2 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
