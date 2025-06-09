// components/SidebarToggle.jsx
import { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiUser,
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";

export default function SidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border-r border-gray-200 shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <Sidebar aria-label="Sidebar Navigation">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiHome}>
                Home
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Profile
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 ml-0 md:ml-64">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow inline-flex items-center"
        >
          <HiMenuAlt3 className="mr-2 w-5 h-5" />
          Open Sidebar
        </button>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          <p className="text-gray-600 mt-2">Your main app content goes here.</p>
        </div>
      </div>
    </div>
  );
}
