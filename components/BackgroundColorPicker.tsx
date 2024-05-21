"use client";

import { useEffect, useState } from "react";
import cookies from "js-cookie";

import ButtonColor from "./ButtonColor";
import ColorPicker from "./ColorPicker";
import { Popover, PopoverContentWrapper, PopoverTrigger } from "./Popover";

interface BackgroundColorPickerProps {
  initialColor?: string;
}
function BackgroundColorPicker({ initialColor }: BackgroundColorPickerProps) {
  const [color, setColor] = useState(initialColor ?? "#d793d7");

  // Sync the background color with the color picker
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", color);
    cookies.set("background", color, { expires: 365 });
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
