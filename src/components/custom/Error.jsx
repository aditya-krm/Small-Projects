import React from "react";

function Error({ message }) {
  return (
    <span className=" text-center text-sm text-red-400">Error: {message}</span>
  );
}

export default Error;
