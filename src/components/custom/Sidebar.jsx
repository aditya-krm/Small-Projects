import React, { forwardRef } from "react";
import LinkComponent from "./LinkComponent";

const Sidebar = forwardRef(({ isOpen, toggleSidebar }, ref) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "/chat-app", text: "Chat App" },
    { to: "/weather-app", text: "Weather App" },
    { to: "/currency-convertor", text: "Currency Convertor" },
  ];

  return (
    <div
      ref={ref}
      className={`z-10 rounded-sm h-full bg-gray-800 transform md:translate-x-0 fixed md:static top-0 right-0 w-48 md:w-48 transition-transform duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={toggleSidebar} className="p-4 md:hidden">
        Close
      </button>
      <ul className="flex flex-col gap-3 p-4">
        {links.map((link, index) => (
          <li key={index}>
            <LinkComponent to={link.to} text={link.text} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Sidebar;
