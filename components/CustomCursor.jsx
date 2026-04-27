"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const computedCursor = window.getComputedStyle(target).cursor;
      setIsPointer(computedCursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON");
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className={`custom-cursor-wrapper ${isPointer ? "pointer" : ""} ${isMouseDown ? "active" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-svg"
      >
        {/* Outer Circle */}
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" className="outer-circle" />
        
        {/* Inner Dashed Circle */}
        <circle 
          cx="16" 
          cy="16" 
          r="6" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="2 2" 
          className="inner-circle" 
        />
        
        {/* Crosshair Lines */}
        <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="16" y1="24" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="2" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Center Dot */}
        <circle cx="16" cy="16" r="0.5" fill="currentColor" />
      </svg>
    </div>
  );
}
