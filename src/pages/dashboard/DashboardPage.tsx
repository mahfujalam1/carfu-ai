import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatArea from "@/components/dashboard/ChatArea";
import Preloader from "@/components/shared/Preloader";

export interface Message {
  role: "user" | "ai";
  content: string;
  videoUrl?: string;
  thumbnail?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "initial",
      title: "New Conversation",
      messages: []
    },
    {
      id: "1",
      title: "How to create AI videos",
      messages: [
        { role: "user", content: "How to create AI videos?" },
        { role: "ai", content: "You can create AI videos by using our Carfu AI platform..." }
      ]
    },
    {
      id: "2",
      title: "Voice cloning techniques",
      messages: []
    }
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("initial");

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    setChats(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (activeChatId === id && filtered.length > 0) {
        setActiveChatId(filtered[0].id);
      } else if (filtered.length === 0) {
        const defaultChat = { id: "default", title: "New Conversation", messages: [] };
        setActiveChatId("default");
        return [defaultChat];
      }
      return filtered;
    });
  };

  const updateMessages = (newMessages: Message[]) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        // Update title based on first message if it's still "New Conversation"
        let title = chat.title;
        if (title === "New Conversation" && newMessages.length > 0) {
          title = newMessages[0].content.slice(0, 30) + (newMessages[0].content.length > 30 ? "..." : "");
        }
        return { ...chat, title, messages: newMessages };
      }
      return chat;
    }));
  };

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black">
      <Sidebar 
        chats={chats} 
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat} 
        onDeleteChat={deleteChat}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea 
          messages={activeChat?.messages || []} 
          setMessages={(updater) => {
            if (typeof updater === "function") {
              updateMessages(updater(activeChat?.messages || []));
            } else {
              updateMessages(updater);
            }
          }} 
        />
      </div>
    </div>
  );
}
