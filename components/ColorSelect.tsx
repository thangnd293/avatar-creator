"use client";

import { Fragment, useState } from "react";
import styled from "styled-components";
import { X } from "react-feather";

import { ButtonColorInfo } from "@/types";
import Tooltip from "./Tooltip";
import ButtonColor from "./ButtonColor";
import VisuallyHidden from "./VisuallyHidden";

interface ColorSelectProps {
  className?: string;
  options: ButtonColorInfo[];
  value: number;
  onChange: (color: number) => void;
}
function ColorSelect({
  className,
  value,
  options,
  onChange,
}: ColorSelectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentColor = options.find((color) => color.value === value);

  return (
    <Wrapper className={className}>
      {isExpanded && (
        <Fragment>
          <CollapseButton onClick={() => setIsExpanded(false)}>
            <X />
            <VisuallyHidden>Close color select</VisuallyHidden>
          </CollapseButton>

          {options.map((option) => (
            <ButtonColor
              key={option.value}
              color={option.color}
              active={option.value === value}
              onClick={() => onChange(option.value)}
            />
          ))}
        </Fragment>
      )}

      {!isExpanded && (
        <Tooltip title={options[0].state}>
          <ButtonColor
            color={currentColor?.color || "transparent"}
            onClick={() => setIsExpanded(true)}
          />
        </Tooltip>
      )}
    </Wrapper>
  );
}

export default ColorSelect;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const CollapseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  background-color: white;
  box-shadow: var(--box-shadow);

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;
