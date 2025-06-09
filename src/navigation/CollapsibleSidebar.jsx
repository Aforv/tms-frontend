import { useState } from "react";
import { Link } from "react-router-dom";
import { HiHome, HiUser, HiMenuAlt1 } from "react-icons/hi";

export default function CollapsibleSidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`h-full transition-all duration-300 bg-white border-r shadow-md flex flex-col ${collapsed ? "w-20" : "w-64"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {!collapsed && <h1 className="text-lg font-semibold">Menu</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-gray-900 ml-auto"
          >
            <HiMenuAlt1 className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors ${collapsed ? "justify-center" : ""}`}
              >
                <HiHome className="w-6 h-6" />
                {!collapsed && <span className="ml-3 text-sm font-medium">Home</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors ${collapsed ? "justify-center" : ""}`}
              >
                <HiUser className="w-6 h-6" />
                {!collapsed && <span className="ml-3 text-sm font-medium">Profile</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
