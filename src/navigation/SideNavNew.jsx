import React, { useState } from 'react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiMenuAlt2,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiOutlineMinusSm,
  HiOutlinePlusSm
} from "react-icons/hi";
import { NavLink } from 'react-router-dom';

function SideNavNew() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md dark:bg-gray-800"
      >
        <HiMenuAlt2 className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-14 transition-all duration-300 bg-white border-r dark:bg-gray-800 dark:border-gray-700 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-full overflow-y-auto px-3 py-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-900 dark:text-white'
                  } hover:bg-gray-100 dark:hover:bg-gray-700`
                }
              >
                <HiChartPie className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Dashboard</span>}
              </NavLink>
            </li>

            {/* E-commerce dropdown */}
            <li>
              <button
                onClick={() => setIsEcommerceOpen(!isEcommerceOpen)}
                className="flex items-center w-full p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiShoppingBag className="w-5 h-5" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">E-commerce</span>
                    {isEcommerceOpen ? (
                      <HiOutlineMinusSm className="w-4 h-4" />
                    ) : (
                      <HiOutlinePlusSm className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>
              {isEcommerceOpen && !isCollapsed && (
                <ul className="pl-10 mt-1 space-y-1">
                  <li><a href="#" className="block py-1 text-sm text-gray-700 dark:text-gray-300">Products</a></li>
                  <li><a href="#" className="block py-1 text-sm text-gray-700 dark:text-gray-300">Sales</a></li>
                  <li><a href="#" className="block py-1 text-sm text-gray-700 dark:text-gray-300">Refunds</a></li>
                  <li><a href="#" className="block py-1 text-sm text-gray-700 dark:text-gray-300">Shipping</a></li>
                </ul>
              )}
            </li>

            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiInbox className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Inbox</span>}
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiUser className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Users</span>}
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiShoppingBag className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Products</span>}
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiArrowSmRight className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Sign In</span>}
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiTable className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Sign Up</span>}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideNavNew;
