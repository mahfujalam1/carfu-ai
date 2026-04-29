import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomeLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#1c1c1c] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full relative z-50">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold">Carfu AI</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/support" className="hover:text-white transition-colors">Help & Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/auth/login"
              className={cn(buttonVariants({ variant: "ghost" }), "text-white rounded-full px-6")}
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className={cn(buttonVariants({ variant: "default" }), "bg-white text-black hover:bg-zinc-200 rounded-full px-6")}
            >
              Get Started
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 text-white hover:bg-zinc-800 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#1c1c1c] border-l border-white/10 p-6 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/pricing" className="text-zinc-300 hover:text-white transition-colors text-lg">Pricing</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/terms" className="text-zinc-300 hover:text-white transition-colors text-lg">Terms & Conditions</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/support" className="text-zinc-300 hover:text-white transition-colors text-lg">Help & Support</Link>
              
              <div className="h-px bg-white/10 my-2" />
              
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/auth/login"
                className={cn(buttonVariants({ variant: "ghost" }), "text-white border border-white/20 rounded-full justify-center w-full")}
              >
                Login
              </Link>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/auth/signup"
                className={cn(buttonVariants({ variant: "default" }), "bg-white text-black hover:bg-zinc-200 rounded-full justify-center w-full")}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}