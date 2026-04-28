import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FiSettings, 
  FiPlus, 
  FiLogOut,
  FiHome,
  FiSearch,
  FiChevronLeft,
  FiMenu,
  FiTrash,
  FiAlertTriangle
} from "react-icons/fi";
import { History } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Chat } from "@/pages/dashboard/DashboardPage";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

export default function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname, activeChatId]);

  const filteredHistory = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmLogout = () => {
    Cookies.remove("demo_token");
    navigate("/auth/login");
  };

  const confirmDeleteChat = () => {
    if (chatToDelete !== null) {
      onDeleteChat(chatToDelete);
      setChatToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const newChat = () => {
    onNewChat();
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-md"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] animate-in fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={cn(
        "fixed md:relative inset-y-0 left-0 z-[80] flex flex-col bg-[#0a0a0a] border-r border-white/5 transition-all duration-500 ease-in-out h-screen",
        isCollapsed ? "w-20" : "w-72",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Toggle Button (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-12 w-6 h-6 bg-white text-black rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 cursor-pointer"
        >
          <FiChevronLeft className={cn("transition-transform duration-500", isCollapsed && "rotate-180")} />
        </button>

        {/* Header / New Chat */}
        <div className="p-4 space-y-4 pt-20 md:pt-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold px-2 py-2 text-white">Carfu AI</h1>
          )}
          <Button 
            onClick={newChat}
            className={cn(
              "w-full bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center gap-3 h-12 shadow-md cursor-pointer",
              isCollapsed ? "justify-center px-0" : "justify-start px-4"
            )}
          >
            <FiPlus size={20} className="shrink-0" />
            {!isCollapsed && <span className="font-semibold">New Chat</span>}
          </Button>
        </div>

        {/* Navigation */}
        <div className="px-2 space-y-1">
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              location.pathname === "/" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
              isCollapsed && "justify-center px-0"
            )}
          >
            <FiHome size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Home</span>}
          </Link>
          <div className={cn("relative group px-2", isCollapsed ? "px-1" : "px-2")}>
            <div className={cn(
              "flex items-center gap-3 px-2 py-3 rounded-xl bg-white/5 border border-white/5",
              isCollapsed && "justify-center"
            )}>
              <FiSearch size={20} className="text-zinc-500 shrink-0" />
              {!isCollapsed && (
                <input 
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-600 text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-hidden flex flex-col mt-4">
          {!isCollapsed && (
            <div className="px-4 py-2 flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              <History size={12} />
              Recent
            </div>
          )}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              {filteredHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "group/item w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all cursor-pointer",
                    activeChatId === chat.id 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  {!isCollapsed ? (
                    <>
                      <span className="truncate flex-1 font-medium">{chat.title}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setChatToDelete(chat.id); setIsDeleteModalOpen(true); }}
                        className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-red-500 transition-all"
                      >
                        <FiTrash size={14} />
                      </button>
                    </>
                  ) : (
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      activeChatId === chat.id ? "bg-white" : "bg-zinc-600"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link 
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-zinc-400 hover:text-white hover:bg-white/5",
              isCollapsed && "justify-center px-0"
            )}
          >
            <FiSettings size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
          
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-500/80 hover:text-red-500 hover:bg-red-500/5 cursor-pointer",
              isCollapsed && "justify-center px-0"
            )}
          >
            <FiLogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Log out</span>}
          </button>

          <div className={cn(
            "flex items-center gap-3 px-2 py-3 mt-4",
            isCollapsed && "justify-center px-0"
          )}>
            <Avatar className="w-10 h-10 border border-white/10 shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Jane Doe</p>
                <p className="text-[10px] text-zinc-500 truncate">jane@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-sm rounded-[32px] p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
              <FiLogOut size={32} />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-center">Log out?</DialogTitle>
              <p className="text-zinc-400">Are you sure you want to log out of your account?</p>
            </div>
            <div className="flex w-full gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5 h-12 rounded-2xl"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-red-500 text-white hover:bg-red-600 h-12 rounded-2xl font-bold"
                onClick={confirmLogout}
              >
                Log out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Chat Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-sm rounded-[32px] p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
              <FiAlertTriangle size={32} />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-center">Delete Chat?</DialogTitle>
              <p className="text-zinc-400">This will permanently delete this conversation. This action cannot be undone.</p>
            </div>
            <div className="flex w-full gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5 h-12 rounded-2xl"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-red-500 text-white hover:bg-red-600 h-12 rounded-2xl font-bold"
                onClick={confirmDeleteChat}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
