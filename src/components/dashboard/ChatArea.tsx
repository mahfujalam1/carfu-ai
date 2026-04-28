import { useState, useRef, useEffect } from "react";
import { FiMic, FiArrowRight, FiPlus, FiDownload, FiPlay } from "react-icons/fi";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { Message } from "@/pages/dashboard/DashboardPage";

interface ChatAreaProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatArea({ messages, setMessages }: ChatAreaProps) {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState<number[]>(new Array(8).fill(0));
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Audio Visualizer Logic
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const updateVisualizer = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Take a slice of the data to animate 8 bars
        const newVolumes = Array.from(dataArray.slice(0, 8)).map(v => v / 255);
        setVolume(newVolumes);
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      
      updateVisualizer();

      // MediaRecorder Logic
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const audioFile = new File([blob], "voice-input.ogg", { type: "audio/ogg" });
        setFile(audioFile);
        setIsRecording(false);
        
        // Cleanup Audio Context
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setVolume(new Array(8).fill(0));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing mic:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isGenerating]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!inputText.trim() && !file) return;

    const userMessage: Message = {
      role: "user",
      content: inputText || (file ? `Uploaded: ${file.name}` : ""),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setFile(null);
    setIsGenerating(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "ai",
        content: "I've generated your video based on the prompt. You can preview and download it below.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800&h=450",
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadVideo = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "generated-video.mp4");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#121212] relative overflow-hidden h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 min-h-0 relative z-10 pt-16 md:pt-0">
        <ScrollArea viewportRef={scrollRef} className="h-full w-full">
          <div className="flex flex-col items-center px-4 py-4 md:py-8 min-h-full">
            <div className="max-w-3xl mx-auto w-full space-y-8 pb-10 flex-1 flex flex-col">
              {/* Initial Greeting - Vertically Centered */}
              {messages.length === 0 && !isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center py-12 md:py-20 animate-in fade-in zoom-in duration-700">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 rotate-12 hover:rotate-0 transition-transform duration-500">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-lg rotate-45" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tighter text-center">
                    How can I help <br /> you today?
                  </h1>
                  <p className="text-zinc-500 text-base md:text-lg text-center max-w-sm md:max-w-md px-4">
                    Create stunning AI videos with your own voice. Just type your prompt below to get started.
                  </p>
                </div>
              )}

              {/* Chat Messages */}
              <div className="space-y-8">
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn("flex flex-col gap-4", msg.role === "user" ? "items-end" : "items-start")}>
                    {msg.role === "user" ? (
                      <div className="bg-[#1c1c1c] text-white px-6 py-3 rounded-[24px] rounded-tr-none text-sm border border-white/5 shadow-xl max-w-[80%] animate-in slide-in-from-right-4">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="flex gap-4 animate-in slide-in-from-left-4 duration-500 w-full">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
                        </div>
                        <div className="space-y-4 flex-1 max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">Carfu AI</span>
                            <span className="px-2 py-0.5 bg-white/5 text-zinc-500 text-[10px] rounded-full uppercase font-bold tracking-tighter">Sparkle</span>
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed">{msg.content}</p>
                          
                          {msg.videoUrl && (
                            <div className="relative group/video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 aspect-video">
                              <video 
                                src={msg.videoUrl} 
                                poster={msg.thumbnail}
                                className="w-full h-full object-cover opacity-80"
                                controls={false}
                                id={`video-${idx}`}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                <button 
                                  onClick={() => {
                                    const v = document.getElementById(`video-${idx}`) as HTMLVideoElement;
                                    if (v.paused) v.play(); else v.pause();
                                  }}
                                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                                >
                                  <FiPlay size={24} fill="black" className="ml-1" />
                                </button>
                              </div>
                              
                              <div className="absolute bottom-6 right-6 flex gap-3">
                                <button 
                                  onClick={() => downloadVideo(msg.videoUrl!)}
                                  className="bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold border border-white/5 shadow-xl cursor-pointer"
                                >
                                  <FiDownload size={16} />
                                  Download
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex gap-4 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      <div className="w-4 h-4 bg-zinc-500 rounded-sm rotate-45" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-white/5 rounded w-1/4" />
                      <div className="h-4 bg-white/5 rounded w-3/4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="w-full bg-[#121212] border-t border-white/5 z-20 px-4 md:px-6 py-4 md:py-8 flex-shrink-0">
        <div className="max-w-3xl mx-auto w-full relative group">
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
          
          {file && (
            <div className="absolute -top-12 left-2 md:left-4 bg-zinc-800 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] md:text-xs text-zinc-300 animate-in fade-in slide-in-from-bottom-2">
              <span className="truncate max-w-[120px] md:max-w-[150px]">{file.name}</span>
              <button onClick={() => setFile(null)} className="hover:text-white transition-colors cursor-pointer">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="relative bg-[#1c1c1c] border border-white/10 rounded-2xl p-2 md:p-3 shadow-2xl">
            {/* Visualizer Overlay */}
            {isRecording && (
              <div className="absolute inset-x-4 -top-8 flex items-end justify-center gap-1 h-6 pointer-events-none">
                {volume.map((v, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${Math.max(20, v * 100)}%` }} 
                    className="w-1 bg-red-500 rounded-full transition-all duration-75"
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-1 md:gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 md:p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <FiPlus size={18} className="md:w-5 md:h-5" />
              </button>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Write something..." 
                className="flex-1 bg-transparent border-none outline-none p-1.5 md:p-2 text-sm md:text-base text-white placeholder:text-zinc-600 resize-none min-h-[40px] md:min-h-[44px] max-h-32"
                rows={1}
              />
              <div className="flex items-center gap-1 md:gap-2">
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "p-1.5 md:p-2 transition-all cursor-pointer rounded-lg hover:bg-white/5",
                    isRecording ? "text-red-500 animate-pulse bg-red-500/10" : "text-zinc-500 hover:text-white"
                  )}
                >
                  <FiMic size={18} className="md:w-5 md:h-5" />
                </button>
                <button 
                  onClick={handleSend}
                  className="bg-white text-black p-2 md:p-2.5 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                >
                  <FiArrowRight size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-[8px] md:text-[10px] text-zinc-600 mt-3 md:mt-4 uppercase tracking-widest font-semibold">
          Carfu AI may display inaccurate info, so double-check its responses.
        </p>
      </div>
    </div>
  );
}
