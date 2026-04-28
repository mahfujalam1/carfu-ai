import { Outlet, useLocation, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

function getGifForRoute(pathname: string): string {
  if (pathname.includes("/signup")) return "/signup.gif";
  if (pathname.includes("/forgot") || pathname.includes("/otp") || pathname.includes("/reset-password")) return "/reset.gif";
  return "/login.gif";
}

export default function AuthLayout() {
  const location = useLocation();
  const gif = getGifForRoute(location.pathname);

  return (
    <div className="flex max-h-screen w-full bg-white dark:bg-zinc-950 relative">
      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-8 right-8 z-50 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm"
      >
        <FiHome size={18} />
        Home
      </Link>

      {/* Left Side - Black background for GIF */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            key={gif}
            src={gif}
            alt="Animation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}