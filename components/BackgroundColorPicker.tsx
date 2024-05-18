"use client";

import { useLayoutEffect, useState } from "react";

import ButtonColor from "./ButtonColor";
import ColorPicker from "./ColorPicker";
import { Popover, PopoverContentWrapper, PopoverTrigger } from "./Popover";

function BackgroundColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  // Sync the background color with the color picker
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--background-color", color);
  }, [color]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonColor color={color} />
      </PopoverTrigger>
      <PopoverContentWrapper side="top" align="end" asChild>
        <ColorPicker color={color} onChange={setColor} />
      </PopoverContentWrapper>
    </Popover>
  );
}

export default BackgroundColorPicker;
