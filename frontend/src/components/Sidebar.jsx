import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-base-300/50 bg-base-100/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ShipWheelIcon className="size-6 text-primary-content" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wide">
              Collab
            </span>
            
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            currentPath === "/"
              ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
              : "hover:bg-base-100 hover:shadow-md text-base-content"
          }`}
        >
          <div className={`p-2 rounded-lg transition-colors ${
            currentPath === "/" 
              ? "bg-primary-content/20" 
              : "bg-base-300/50 group-hover:bg-primary/10"
          }`}>
            <HomeIcon className="size-5" />
          </div>
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            currentPath === "/friends"
              ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
              : "hover:bg-base-100 hover:shadow-md text-base-content"
          }`}
        >
          <div className={`p-2 rounded-lg transition-colors ${
            currentPath === "/friends" 
              ? "bg-primary-content/20" 
              : "bg-base-300/50 group-hover:bg-primary/10"
          }`}>
            <UsersIcon className="size-5" />
          </div>
          <span className="font-medium">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            currentPath === "/notifications"
              ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
              : "hover:bg-base-100 hover:shadow-md text-base-content"
          }`}
        >
          <div className={`p-2 rounded-lg transition-colors relative ${
            currentPath === "/notifications" 
              ? "bg-primary-content/20" 
              : "bg-base-300/50 group-hover:bg-primary/10"
          }`}>
            <BellIcon className="size-5" />
            {/* Notification badge - you can add conditional logic for actual notifications */}
          </div>
          <span className="font-medium">Notifications</span>
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-base-300/50 bg-base-100/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-base-200 to-base-300 hover:shadow-lg transition-all duration-300">
          <div className="avatar online">
            <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-success"></span>
              </span>
              <span className="text-xs text-success font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;