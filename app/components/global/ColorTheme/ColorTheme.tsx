"use client";
import { useEffect, useState } from "react";

export default function ColorTheme() {
  const [color, setColor] = useState("#4f46e5");

  useEffect(() => {
    console.log(color);
    // document.documentElement.style.setProperty("--primary", color);
  }, [color]);

  return (
    <div>
      <input
        type="color"
        value={color}
        // @ts-ignore COMEBACK: too lazy to type-safe
        onInput={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
