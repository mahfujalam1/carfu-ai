import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#1c1c1c] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative z-50">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold">Carfu AI</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/support" className="hover:text-white transition-colors">Help & Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/auth/login"
            className={cn(buttonVariants({ variant: "ghost" }), "text-white  rounded-full px-6")}
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
      </nav>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}