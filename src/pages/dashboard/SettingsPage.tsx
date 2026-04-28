import {
  FiArrowLeft,
  FiUser,
  FiLock,
  FiPieChart,
  FiHelpCircle,
  FiCamera,
  FiCheck,
  FiCreditCard
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "account", label: "My Account", icon: <FiUser size={18} /> },
    { id: "subscription", label: "Subscription", icon: <FiCreditCard size={18} /> },
    { id: "password", label: "Security", icon: <FiLock size={18} /> },
    { id: "usage", label: "Usage & Limit", icon: <FiPieChart size={18} /> },
    { id: "support", label: "Help & Support", icon: <FiHelpCircle size={18} /> },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col md:flex-row text-white">
      {/* Settings Sidebar */}
      <div className="w-full md:w-80 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-400 hover:text-white"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto bg-[#0d0d0d] p-6 md:p-16">
        <div className="max-w-2xl mx-auto">
          {activeTab === "account" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-bold mb-2">My Account</h2>
                <p className="text-zinc-500 text-sm md:text-base">Manage your profile information and preferences.</p>
              </div>

              <div className="flex flex-col items-center sm:flex-row gap-8 pb-8 border-b border-white/5">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-[30px] md:rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                    <img src={profileImage} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-[-5px] right-[-5px] bg-white text-black p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-[#0d0d0d]"
                  >
                    <FiCamera size={16} />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
                </div>
                <div className="space-y-1 flex-1 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold">Jane Doe</h3>
                  <p className="text-zinc-500 text-sm md:text-base">jane@example.com</p>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pt-2">Member since Sep 2026</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">First Name</label>
                  <Input defaultValue="Jane" className="bg-white/5 border-white/5 h-12 md:h-14 rounded-xl md:rounded-2xl focus-visible:ring-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Last Name</label>
                  <Input defaultValue="Doe" className="bg-white/5 border-white/5 h-12 md:h-14 rounded-xl md:rounded-2xl focus-visible:ring-white/20" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Email Address</label>
                  <Input defaultValue="jane@example.com" className="bg-white/5 border-white/5 h-12 md:h-14 rounded-xl md:rounded-2xl focus-visible:ring-white/20" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-xl md:rounded-2xl px-10 h-12 md:h-14 font-bold shadow-xl flex items-center justify-center gap-2">
                  <FiCheck />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-bold mb-2">Subscription</h2>
                <p className="text-zinc-500 text-sm md:text-base">Manage your billing and subscription plan.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="bg-[#121212] border border-white/10 rounded-[32px] p-8 space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FiCreditCard size={80} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Current Plan</p>
                    <h3 className="text-2xl font-bold">Carfu Pro</h3>
                    <p className="text-zinc-400 text-sm mt-1">Next billing date: Oct 28, 2026</p>
                  </div>
                  <div className="text-3xl font-bold">
                    $25<span className="text-sm font-normal text-zinc-500">/month</span>
                  </div>
                  <Button className="w-full bg-white/5 text-white hover:bg-white/10 border border-white/5 rounded-2xl h-12 font-bold">
                    Manage Billing
                  </Button>
                </div>

                <div className="bg-white text-black rounded-[32px] p-8 space-y-6 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Upgrade</p>
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-zinc-600 text-sm mt-1">Unlimited video generation & 4K quality.</p>
                  </div>
                  <div className="text-3xl font-bold">
                    Custom<span className="text-sm font-normal text-zinc-400">/year</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-2xl h-12 font-bold">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-bold mb-2">Security</h2>
                <p className="text-zinc-500">Update your password to keep your account secure.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Current Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/5 h-14 rounded-2xl focus-visible:ring-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/5 h-14 rounded-2xl focus-visible:ring-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/5 h-14 rounded-2xl focus-visible:ring-white/20" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-10 h-14 font-bold shadow-xl">
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-4xl font-bold mb-2 tracking-tight">Usage & Limit</h2>
                <p className="text-zinc-500 text-lg">Manage your Personalization</p>
              </div>

              <div className="bg-[#121212] border border-white/5 rounded-[32px] p-8 space-y-8 shadow-2xl">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Active Plan</p>
                    <p className="text-xl font-bold">Pro Monthly</p>
                  </div>
                  <span className="text-sm font-bold text-zinc-400">30/20h</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[65%] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                </div>
              </div>

              <div className="bg-[#121212] border border-white/5 rounded-[32px] p-10 shadow-2xl">
                <div className="flex justify-between mb-12">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">History</p>
                    <p className="text-sm font-medium text-zinc-400">1sep, 2026 — 31sep, 2026</p>
                  </div>
                </div>

                <div className="relative h-64 flex items-end justify-between gap-2 px-10">
                  {[40, 60, 55, 60, 45, 55, 20, 50, 80, 55, 75, 10, 5, 10, 70, 40, 65, 30, 90, 10, 15].map((h, i) => (
                    <div key={i} className="flex-1 group relative flex flex-col items-center h-full justify-end">
                      {i === 18 && (
                        <div className="absolute top-[-50px] z-10 animate-in fade-in zoom-in duration-500">
                          <div className="bg-zinc-800 text-white text-[11px] px-4 py-2 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center whitespace-nowrap">
                            <span className="font-bold">1h 50m</span>
                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-800" />
                          </div>
                        </div>
                      )}
                      <div
                        style={{ height: `${h}%` }}
                        className={cn(
                          "w-full rounded-full transition-all duration-700",
                          i === 18 ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "bg-white/10 group-hover:bg-white/20"
                        )}
                      />
                      {i === 18 && <div className="absolute bottom-0 w-2 h-2 bg-white rounded-full translate-y-4" />}
                    </div>
                  ))}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-zinc-600 uppercase">
                    <span>3h</span>
                    <span>2h</span>
                    <span>1h</span>
                    <span>0h</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-4xl font-bold mb-2 tracking-tight">Help & Support</h2>
                <p className="text-zinc-500 text-lg">Contact with our support team</p>
              </div>

              <div className="space-y-8">
                <div className="bg-[#121212] border border-white/5 rounded-[32px] p-4 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-4">Title</label>
                  <Input placeholder="Title here" className="bg-transparent border-none h-10 text-lg focus-visible:ring-0 placeholder:text-zinc-800" />
                </div>
                <div className="bg-[#121212] border border-white/5 rounded-[32px] p-6 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Description</label>
                  <textarea
                    placeholder="Write description here"
                    className="w-full min-h-[250px] bg-transparent border-none text-zinc-300 focus-visible:outline-none resize-none placeholder:text-zinc-800 text-lg"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-[32px] h-20 text-xl font-bold shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
