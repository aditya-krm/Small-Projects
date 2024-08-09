import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef, useCallback } from "react";

/*
useEffect : "https://react.dev/reference/react/useEffect"
useRef : "https://react.dev/reference/react/useRef"
useCallback : "https://react.dev/reference/react/useCallback"
useState : "https://react.dev/reference/react/useState"
*/

function BgChanger() {
  const [color, setColor] = useState("#020817");
  const [randomColor, setRandomColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");

  const ColorRef = useRef(null);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getTextColor = (bgColor) => {
    // Convert hex color to RGB
    const color = bgColor.substring(1); // Remove "#"
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Calculate the brightness of the color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // If brightness is greater than 128, the color is light, so return dark text
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  const copyToClipboard = useCallback(() => {
    ColorRef.current?.select();
    window.navigator.clipboard.writeText(color);
  }, [color]);

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, [color]);

  useEffect(() => {
    setTextColor(getTextColor(randomColor));
  }, [randomColor]);

  return (
    <div
      className="w-full h-full relative rounded"
      style={{ backgroundColor: color, color: textColor }}
    >
      <h1 className="text-xl mx-2">
        This is a background changer with the use of Logic &{" "}
        <a
          href="https://react.dev/reference/react/useState"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          useState
        </a>
        ,{" "}
        <a
          href="https://react.dev/reference/react/useEffect"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          useEffect
        </a>
        ,{" "}
        <a
          href="https://react.dev/reference/react/useRef"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          useRef
        </a>
        , and{" "}
        <a
          href="https://react.dev/reference/react/useCallback"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          useCallback
        </a>{" "}
        hooks.
      </h1>
      <div className="flex w-48 mx-auto gap-2 border border-fuchsia-200/50 rounded-lg">
        <Input
          className="text-white bg-inherit text-xl border-none"
          readOnly
          value={color}
          ref={ColorRef}
        />
        <Button onClick={copyToClipboard}>Copy</Button>
      </div>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 gap-2">
        <Button
          style={{ backgroundColor: "red", color: getTextColor("red") }}
          onClick={() => setColor("red")}
        >
          Red
        </Button>
        <Button
          style={{ backgroundColor: "green", color: getTextColor("green") }}
          onClick={() => setColor("green")}
        >
          Green
        </Button>
        <Button
          style={{ backgroundColor: "blue", color: getTextColor("blue") }}
          onClick={() => setColor("blue")}
        >
          Blue
        </Button>
        <Button
          style={{ backgroundColor: "purple", color: getTextColor("purple") }}
          onClick={() => setColor("purple")}
        >
          Purple
        </Button>
        <Button
          style={{ backgroundColor: "orange", color: getTextColor("orange") }}
          onClick={() => setColor("orange")}
        >
          Orange
        </Button>
        <Button
          style={{ backgroundColor: "pink" }}
          onClick={() => setColor("pink")}
        >
          Pink
        </Button>
        <Button
          style={{ backgroundColor: randomColor, color: textColor }}
          onClick={() => setColor(randomColor)}
        >
          {randomColor}
        </Button>
      </div>
    </div>
  );
}

export default BgChanger;
