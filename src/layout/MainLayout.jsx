import React, { useState, useEffect, useRef } from "react";
import { Navbar, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          ref={sidebarRef}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className="w-1/3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100"
        />
        <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
