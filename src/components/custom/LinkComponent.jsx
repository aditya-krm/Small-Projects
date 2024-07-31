import React from "react";
import { Link } from "react-router-dom";

function LinkComponent({ to, text }) {
  return (
    <Link
      to={to}
      className="block border border-gray-600 rounded-sm p-2 hover:bg-gray-700"
    >
      {text}
    </Link>
  );
}

export default LinkComponent;
