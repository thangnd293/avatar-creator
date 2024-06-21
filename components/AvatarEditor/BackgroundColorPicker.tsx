"use client";

import { useEffect } from "react";
import styled from "styled-components";
import cookies from "js-cookie";

import { useAvatarStates } from "@/components/AvatarStatesProvider";
import VisuallyHidden from "@/components/VisuallyHidden";
import {
  Popover,
  PopoverContentWrapper,
  PopoverTrigger,
} from "@/components/Popover";
import ScrollArea from "@/components/ScrollArea";
import { BACKGROUND_COLORS } from "@/constants/avatar";
import ButtonColor from "./ButtonColor";

function BackgroundColorPicker() {
  const { avatarStates, changeAvatarState } = useAvatarStates();
  const color = avatarStates["BackgroundColor"];

  const colorHex =
    BACKGROUND_COLORS.find((option) => option.value === color)?.color ??
    BACKGROUND_COLORS[0].color;

  // Sync the background color with the color picker
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", colorHex);
    cookies.set("background-color", colorHex, { expires: 365 });
  }, [colorHex]);

  const handleChangeBackgroundColor = (color: number) => {
    changeAvatarState("BackgroundColor", color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonColor color={colorHex}>
          <VisuallyHidden>Change background color</VisuallyHidden>
        </ButtonColor>
      </PopoverTrigger>

      <PopoverContentWrapper side="top" align="end" asChild>
        <PopoverContent>
          <Title>Pick a color</Title>
          <VerticalScrollArea>
            <OptionWrapper>
              {BACKGROUND_COLORS.map((option) => (
                <ButtonColor
                  key={option.value}
                  color={option.color}
                  active={option.value === color}
                  onClick={() => handleChangeBackgroundColor(option.value)}
                />
              ))}
            </OptionWrapper>
          </VerticalScrollArea>
        </PopoverContent>
      </PopoverContentWrapper>
    </Popover>
  );
}

export default BackgroundColorPicker;

const VerticalScrollArea = styled(ScrollArea)`
  padding: 12px;
`;

const PopoverContent = styled.div`
  border-radius: 16px;
`;

const Title = styled.p`
  font-weight: var(--weight-bold);
  color: var(--color-gray-700);
  padding: 16px 16px 0;
`;

const OptionWrapper = styled.div`
  display: grid;
  max-height: 300px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--button-color-size), 1fr)
  );
  gap: 12px;
  justify-items: center;
  align-items: center;
`;
